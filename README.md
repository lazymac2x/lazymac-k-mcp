# @lazymac/k-mcp

> ⭐ **Building in public from $0 MRR.** Star if you want to follow the journey — [lazymac-mcp](https://github.com/lazymac2x/lazymac-mcp) (42 tools, one MCP install) · [lazymac-k-mcp](https://github.com/lazymac2x/lazymac-k-mcp) (Korean wedge) · [lazymac-sdk](https://github.com/lazymac2x/lazymac-sdk) (TS client) · [api.lazy-mac.com](https://api.lazy-mac.com) · [Pro $29/mo](https://coindany.gumroad.com/l/zlewvz).

> **K-MCP — Korean wedge MCP server.** 9 tools for the data global SaaS need to ship in Korea: PIPA compliance, KRW + BOK rates, 사업자등록번호 lookup, Korean address geocoding, NLP, public data — all returned as English JSON.

[![npm](https://img.shields.io/npm/v/@lazymac/k-mcp.svg)](https://www.npmjs.com/package/@lazymac/k-mcp)
[![smithery badge](https://smithery.ai/badge/@lazymac/k-mcp)](https://smithery.ai/server/lazymac/k-mcp)
[![lazymac2x/lazymac-k-mcp MCP server](https://glama.ai/mcp/servers/lazymac2x/lazymac-k-mcp/badges/score.svg)](https://glama.ai/mcp/servers/lazymac2x/lazymac-k-mcp)

## Install (Claude Desktop / Code / Cursor / Windsurf)

```json
{
  "mcpServers": {
    "k-mcp": {
      "command": "npx",
      "args": ["-y", "@lazymac/k-mcp"]
    }
  }
}
```

## Tools

| Tool | What it does |
|------|--------------|
| `k_privacy_scan` | Korean PIPA compliance scan — URL → risk score + violations |
| `k_market_intel` | KOSPI/KOSDAQ, stocks, FX, Kimchi Premium |
| `k_public_data` | Korean government data in English (weather, holidays, transport) |
| `k_address_tools` | Address normalize/parse/validate/postal lookup |
| `k_address_geocoder` | Address ↔ coordinates (road / lot) |
| `k_business_validator` | Validate 사업자등록번호 + corp registration |
| `k_company_lookup` | Lookup Korean company by BRN |
| `k_exchange_rate` | Real-time KRW + BOK base rate + CPI |
| `k_govdata` | Korean public data REST → English JSON |

## Why this exists

Most "Korean data" APIs return XML, require Korean-only docs, or charge enterprise pricing. K-MCP normalizes all of that into a single MCP server so any AI agent can reason about Korea-specific compliance, finance, and identity.

Backed by **[api.lazy-mac.com](https://api.lazy-mac.com)** — Cloudflare Workers, sub-200ms p95, free tier on every endpoint.

## Related

- 🧰 [@lazymac/mcp](https://www.npmjs.com/package/@lazymac/mcp) — full 42-tool unified MCP
- 🌐 [api.lazy-mac.com](https://api.lazy-mac.com) — REST hub
- 🇰🇷 [api.lazy-mac.com/k-privacy-scanner](https://api.lazy-mac.com/k-privacy-scanner) — try PIPA scan in your browser

## License

MIT

<sub>💡 Host your own stack? <a href="https://m.do.co/c/c8c07a9d3273">Get $200 DigitalOcean credit</a> via lazymac referral link.</sub>
