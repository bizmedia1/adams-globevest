const OWNER = "bizmedia1";
const REPO = "adams-globevest";
const FILE = "config.json";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const token = process.env.GITHUB_TOKEN;

    const { bankName, accountName, accountNumber, ctaLink } = req.body;

    // Get current file
    const current = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json"
        }
      }
    );

    const file = await current.json();

    const content = Buffer.from(
      JSON.stringify(
        {
          bankName,
          accountName,
          accountNumber,
          ctaLink
        },
        null,
        2
      )
    ).toString("base64");

    // Update file
    const update = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "Update GlobeVest config",
          content,
          sha: file.sha
        })
      }
    );

    if (!update.ok) {
      const err = await update.text();
      return res.status(500).json({ error: err });
    }

    return res.json({ success: true });

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}
