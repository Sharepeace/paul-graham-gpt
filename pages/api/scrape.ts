import type { NextApiRequest, NextApiResponse } from "next";
import scrapeGithubRepo from "../../utils/scrapeGithubRepo";
import { loadEnvConfig } from "@next/env";
loadEnvConfig("");


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const repoUrl = req.query.repoUrl as string;
        if (typeof repoUrl !== "string") {
            return res.status(400).json({ error: "Invalid repoUrl parameter" });
        }
        const scrapedText = await scrapeGithubRepo(repoUrl, process.env.GITHUB_TOKEN);
        res.status(200).json({ data: Array.from(scrapedText.entries()) });
    } catch (error) {
        const err = error as Error & { code?: string, message?: string }; // Assert the type of error
        res.status(400).json({ error: err.message });
    }
}


// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const { repoUrl, page, perPage } = req.query;

//     if (typeof repoUrl !== "string") {
//         return res.status(400).json({ error: "Invalid repoUrl parameter" });
//     }

//     const currentPage = parseInt(page as string) || 1;
//     const itemsPerPage = parseInt(perPage as string) || 10;

//     try {
//         const scrapedText = await scrapeGithubRepo(repoUrl, process.env.GITHUB_TOKEN);

//         const paginatedData = Array.from(scrapedText)
//             .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//         res.status(200).json({
//             data: paginatedData,
//             currentPage,
//             totalPages: Math.ceil(scrapedText.size / itemsPerPage),
//         });
//     } catch (error) {
//         const err = error as Error & { code?: string, message?: string }; // Assert the type of error
//         res.status(500).json({ error: err.message });
//     }
// }
