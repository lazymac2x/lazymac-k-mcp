#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// K-MCP — Korean wedge tools backed by api.lazy-mac.com
const TOOLS = [
  { name: "k_market_intel", route: "/kr-market", method: "GET", desc: "Korean financial data — KOSPI / KOSDAQ, stocks, FX, Kimchi Premium, news" },
  { name: "k_public_data", route: "/kr-data", method: "GET", desc: "Korean government data in English JSON — weather, FX, holidays, transport" },
  { name: "k_address_tools", route: "/kr-address", method: "GET", desc: "Korean address normalize / parse / validate / geocode / postal lookup" },
  { name: "k_business_validator", route: "/kr-biz", method: "GET", desc: "Validate Korean BRN (사업자등록번호), corp registration, phone format" },
  { name: "k_exchange_rate", route: "/k-exchange-rate", method: "GET", desc: "Real-time KRW exchange rate + BOK base rate + CPI (history supported)" },
  { name: "k_company_lookup", route: "/k-company-lookup", method: "GET", desc: "Korean company lookup by 사업자등록번호 → company info + status" },
  { name: "k_address_geocoder", route: "/k-address-geocoder", method: "GET", desc: "Korean address ↔ coordinates geocoder + reverse geocoder" },
  { name: "k_privacy_scan", route: "/k-privacy-scanner", method: "GET", desc: "Korean PIPA compliance scanner — URL → risk score + violations report" },
  { name: "k_govdata", route: "/govdata-korea", method: "GET", desc: "Korean public data API — exchange rates, holidays, indicators, English JSON" },
];

export default function createServer({ config } = {}) {
  const apiBase = (config && config.apiBase) || process.env.LAZYMAC_API_BASE || "https://api.lazy-mac.com";
  const apiKey = (config && config.apiKey) || process.env.LAZYMAC_API_KEY || "";
  const server = new Server(
    { name: "lazymac-k-mcp", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS.map((t) => ({
      name: t.name,
      description: t.desc,
      inputSchema: {
        type: "object",
        properties: { params: { type: "object", description: "Free-form params object" } },
      },
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = TOOLS.find((t) => t.name === request.params.name);
    if (!tool) {
      return { content: [{ type: "text", text: `Unknown tool: ${request.params.name}` }], isError: true };
    }
    const args = (request.params.arguments && request.params.arguments.params) || {};
    let url = `${apiBase}${tool.route}`;
    const init = {
      method: tool.method,
      headers: { "User-Agent": "lazymac-k-mcp/1.0.0", ...(apiKey ? { "X-API-Key": apiKey } : {}) },
    };
    if (tool.method === "GET") {
      const qs = new URLSearchParams(
        Object.entries(args).map(([k, v]) => [k, typeof v === "object" ? JSON.stringify(v) : String(v)])
      ).toString();
      if (qs) url += `?${qs}`;
    } else {
      init.headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(args);
    }
    try {
      const res = await fetch(url, init);
      const text = await res.text();
      const upgradeHint = res.status === 402
        ? `\n\n💡 Free tier exceeded. Upgrade: https://api.lazy-mac.com/pricing`
        : "";
      return { content: [{ type: "text", text: `HTTP ${res.status}\n${text}${upgradeHint}` }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Error: ${e.message}` }], isError: true };
    }
  });

  return server;
}

export function createSandboxServer() {
  return createServer({ config: { apiBase: "https://api.lazy-mac.com" } });
}

const isMain = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("index.js");
if (isMain) {
  (async () => {
    const server = createServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
  })();
}
