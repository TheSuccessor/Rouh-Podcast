
import { Document, Packer, Paragraph, HeadingLevel, AlignmentType, ShadingType } from "docx";
import saveAs from "file-saver";
import { EpisodeState } from "../types";

// Helper to generate paragraphs for an episode
const generateEpisodeContent = (ep: EpisodeState, includeSummary: boolean, includeScript: boolean): Paragraph[] => {
  const children: Paragraph[] = [];

  // Determine header text based on user input
  let headerText = `Episode ${ep.id}`;
  if (ep.serialNumber && ep.title) {
    headerText = `Episode ${ep.serialNumber}: ${ep.title}`;
  } else if (ep.title) {
    headerText = ep.title;
  } else if (ep.serialNumber) {
    headerText = `Episode ${ep.serialNumber}`;
  }

  // --- Header Block Start ---
  
  // Series Name (if present)
  if (ep.seriesName) {
    children.push(
      new Paragraph({
        text: ep.seriesName.toUpperCase(),
        bold: true,
        color: "FFFFFF", // White text
        shading: {
            fill: "111827", // Dark Slate 900 background
            val: ShadingType.CLEAR,
        },
        spacing: { before: 400, after: 0 }, 
        indent: { start: 100 },
        bidirectional: true, // RTL
      })
    );
  }

  // Main Episode Header (Title/Serial)
  children.push(
    new Paragraph({
      text: headerText.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      bold: true,
      color: "FFFFFF", // White text
      shading: {
        fill: "111827", // Dark Slate 900 background
        val: ShadingType.CLEAR,
      },
      // If series name exists, minimal top spacing, otherwise standard spacing
      spacing: { before: ep.seriesName ? 0 : 400, after: ep.date ? 50 : 300 }, 
      indent: { start: 100 }, // Slight indent
      bidirectional: true, // RTL
    })
  );

  // Date (if present)
  if (ep.date) {
    children.push(
      new Paragraph({
        text: `DATE: ${ep.date}`,
        bold: true,
        color: "FFFFFF", // White text
        shading: {
            fill: "111827", // Match header background
            val: ShadingType.CLEAR,
        },
        spacing: { before: 0, after: 300 },
        indent: { start: 100 },
        bidirectional: true, // RTL
      })
    );
  } else {
     // If no date, ensuring spacing after the header block
     if (!ep.date) {
       children.push(new Paragraph({ text: "", spacing: { after: 100 }, bidirectional: true }));
     }
  }
  // --- Header Block End ---

  if (includeSummary) {
    children.push(
      new Paragraph({
        text: `Summary`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        color: "2E7D32",
        bidirectional: true, // RTL
      })
    );

    if (ep.rawSummary) {
      const summaryLines = ep.rawSummary.split('\n');
      summaryLines.forEach(line => {
        children.push(new Paragraph({ 
            text: line,
            bidirectional: true // RTL
        }));
      });
    } else {
        children.push(new Paragraph({ 
            text: "[No summary generated]",  
            italics: true, 
            color: "808080",
            bidirectional: true // RTL
        }));
    }
  }

  if (includeScript) {
    children.push(
      new Paragraph({
        text: `Refined Script`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        color: "1565C0",
        bidirectional: true, // RTL
      })
    );

    if (ep.refinedScript) {
        const scriptLines = ep.refinedScript.split('\n');
        scriptLines.forEach(line => {
          children.push(new Paragraph({ 
            text: line,
            bidirectional: true // RTL
          }));
        });
    } else {
        children.push(new Paragraph({ 
            text: "[No refined script generated]", 
            italics: true, 
            color: "808080",
            bidirectional: true // RTL
        }));
    }
  }

  return children;
};

// Existing bulk export
export const generateAndDownloadDocx = async (episodes: EpisodeState[]) => {
  const children: Paragraph[] = [];
  
  children.push(
    new Paragraph({
      text: "Rouh Podcast",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      bidirectional: true, // RTL
    })
  );

  episodes.forEach((ep, index) => {
      // For bulk export, we generally want everything
      children.push(...generateEpisodeContent(ep, true, true));
      
      if (index !== episodes.length - 1) {
         children.push(new Paragraph({ pageBreakBefore: true, bidirectional: true }));
      }
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "podcast_workflow_export.docx");
};

// New single episode export
export const generateSingleEpisodeDocx = async (episode: EpisodeState, type: 'SUMMARY_ONLY' | 'SCRIPT_ONLY' | 'FULL') => {
    const includeSummary = type === 'FULL' || type === 'SUMMARY_ONLY';
    const includeScript = type === 'FULL' || type === 'SCRIPT_ONLY';
    
    const children: Paragraph[] = [];
    
    // Construct a sensible filename
    let filenameBase = `episode_${episode.id}`;
    if (episode.serialNumber) filenameBase = `episode_${episode.serialNumber}`;
    
    // We do NOT add a separate "Export Title" here because generateEpisodeContent
    // now handles the main episode header (title/serial number).
    
    children.push(...generateEpisodeContent(episode, includeSummary, includeScript));

    const doc = new Document({
        sections: [
        {
            properties: {},
            children: children,
        },
        ],
    });

    const blob = await Packer.toBlob(doc);
    
    let suffix = 'complete';
    if (type === 'SCRIPT_ONLY') suffix = 'script';
    else if (type === 'SUMMARY_ONLY') suffix = 'summary';

    saveAs(blob, `${filenameBase}_${suffix}.docx`);
};