// npm install docx file-saver (agar hali o'rnatilmagan bo'lsa)
import {
    Document, Packer, Paragraph, Table, TableRow, TableCell,
    TextRun, AlignmentType, WidthType, HeadingLevel, ShadingType,
  } from "docx"
  import { saveAs } from "file-saver"
  
  export async function generateOstatkaWord({ brandName, date, groupedItems, totalSum, totalCount }) {
    const headerCell = (text, width) =>
      new TableCell({
        width: { size: width, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, fill: "224386" },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 18 })],
          }),
        ],
      })
  
    const headerRow = new TableRow({
      children: [
        headerCell("#", 5),
        headerCell("Номенклатура", 45),
        headerCell("Кол.", 15),
        headerCell("Цена", 15),
        headerCell("Сумма", 20),
      ],
    })
  
    const rows = [headerRow]
  
    groupedItems.forEach(([catName, catItems]) => {
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 5,
              shading: { type: ShadingType.CLEAR, fill: "E8F0FE" },
              children: [new Paragraph({ children: [new TextRun({ text: catName, bold: true, color: "224386" })] })],
            }),
          ],
        })
      )
  
      catItems.forEach((product, idx) => {
        const sum = (product.allResidual || 0) * (product.price || 0)
        rows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, text: String(idx + 1) })] }),
              new TableCell({ children: [new Paragraph({ text: product.name })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, text: `${(product.allResidual || 0).toLocaleString("ru-RU")} ${product.unit || ""}` })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, text: (product.price || 0).toLocaleString("ru-RU") })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: sum.toLocaleString("ru-RU"), bold: true })] })] }),
            ],
          })
        )
      })
    })
  
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows,
    })
  
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun({ text: `${brandName} — Остатка товаров`, bold: true, color: "224386" })],
            }),
            new Paragraph({ text: `Дата: ${date}`, spacing: { after: 200 } }),
            table,
            new Paragraph({ text: "", spacing: { after: 200 } }),
            new Paragraph({ children: [new TextRun({ text: `Общая позиция: ${totalCount} тур` })] }),
            new Paragraph({ children: [new TextRun({ text: `Общая сумма: ${totalSum.toLocaleString("ru-RU")} сом`, bold: true, size: 26 })] }),
          ],
        },
      ],
    })
  
    const blob = await Packer.toBlob(doc)
    saveAs(blob, `Остатка_${brandName}_${date}.docx`)
  }