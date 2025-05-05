# 🔍 BuiltWith MCP Server 🚀

## 🌟 Overview

A Model Context Protocol (MCP) server that integrates with BuiltWith's technology detection API. This server allows AI assistants to identify the technology stack behind any website, providing detailed information about frameworks, analytics tools, hosting services, and more - all through natural language commands.

## 🛠️ Features

-   🌐 **Domain Lookup**: Get comprehensive technology profiles for any website


## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/builtwith/mcp.git

# Navigate to directory
cd mcp

# Install dependencies
npm install


```

## ⚙️ Configuration

The BuiltWith MCP Server requires an API key from [BuiltWith](https://api.builtwith.com/). Configure the server with your API key as follows:

```json
{
    "mcpServers": {
        "builtwith": {
            "command": "node",
            "args": ["[PATH-TO]/bw-mcp-v1.js"],
            "env": {
                "BUILTWITH_API_KEY": "[YOUR-API-KEY]"
            }
        }
    }
}

```

### Configuration Locations

-   **Claude Desktop**: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows)
-   **VS Code (Cursor/Claude Dev)**: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` (macOS) or `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json` (Windows)

## 🚀 Usage

Once configured, you can use the BuiltWith MCP Server with any MCP-compatible AI assistant. Here are some examples of what you can ask:

-   "What technologies is example.com using?"
-   "What CMS does nytimes.com run on?"
-   "Does amazon.com use Google Analytics?"
-   "What JavaScript frameworks are used by spotify.com?"
-   "What hosting provider does netflix.com use?"
-   "Compare the technology stacks of facebook.com and twitter.com"

## 🧩 How It Works

The BuiltWith MCP Server acts as a bridge between AI assistants and the BuiltWith API:

1.  🗣️ The AI assistant receives a user query about website technologies
2.  🔌 The assistant connects to the BuiltWith MCP Server
3.  🔍 The server makes appropriate API calls to BuiltWith
4.  📊 Technology data is retrieved and formatted
5.  💬 The AI assistant provides human-friendly insights based on the data

## 📖 API Documentation

For more information about the BuiltWith API, visit:

-   [BuiltWith API Documentation](https://api.builtwith.com/)
-   [BuiltWith Domain API](https://api.builtwith.com/domain-api)



## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

----------

<p align="center">Made with ❤️ for the AI community</p>
