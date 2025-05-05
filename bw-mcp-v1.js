import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";


export const server = new McpServer({
    name: "builtwith",
    version: "1.0.0",
  });


const BUILTWITH_API_KEY = process.env.BUILTWITH_API_KEY;
const BUILTWITH_API_HOSTNAME = "api.builtwith.com";

var _tools = function (){

    server.tool("domain-lookup",
        "Returns the live web technologies use on the root domain name.",
        {domain:z.string()},
        async({domain})=>{

            const response = await fetch(`https://${BUILTWITH_API_HOSTNAME}/v21/api.json?key=${BUILTWITH_API_KEY}&lookup=${domain}&LIVEONLY=yes`);
                const data = await response.json();
                const extractedData = [];
                if (data.Results && data.Results[0] && data.Results[0].Result && data.Results[0].Result.Paths) {
                    for (const path of data.Results[0].Result.Paths) {
                      if (path.Technologies && Array.isArray(path.Technologies)) {
                        for (const tech of path.Technologies) {
                          extractedData.push({
                            Name: tech.Name,
                            Description: tech.Description,
                            Tag: tech.Tag,
                            Link:tech.Link
                          });
                        }
                      }
                    }
                  }

                return {
                    content: [{ type: "text", text: JSON.stringify(extractedData) }]
                };

            

        });

}



export async function main() {

    _tools();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("BuiltWith MCP Server running on stdio");
}


main();
  