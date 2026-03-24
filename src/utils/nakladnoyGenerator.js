// utils/nakladnoyGenerator.js
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
} from "docx";
import { saveAs } from "file-saver";

// ─── Chegara style ────────────────────────────────────────────────────────────
const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const borders = {
  top: border,
  bottom: border,
  left: border,
  right: border,
};

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = {
  top: noBorder,
  bottom: noBorder,
  left: noBorder,
  right: noBorder,
};

// ─── Oddiy paragraf ───────────────────────────────────────────────────────────
const makeParagraph = (text, options = {}) =>
  new Paragraph({
    alignment: options.align || AlignmentType.LEFT,
    spacing: { after: options.spacingAfter ?? 80 },
    children: [
      new TextRun({
        text,
        bold: options.bold || false,
        size: options.size || 22,
        font: "Times New Roman",
        color: "000000",
      }),
    ],
  });

// ─── Jadval header cell ───────────────────────────────────────────────────────
const makeHeaderCell = (text, width) =>
  new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text,
            bold: true,
            size: 20,
            font: "Times New Roman",
            color: "000000",
          }),
        ],
      }),
    ],
  });

// ─── Oddiy jadval cell ────────────────────────────────────────────────────────
const makeCell = (text, width, options = {}) =>
  new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: options.shading
      ? { fill: options.shading, type: ShadingType.CLEAR }
      : undefined,
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        alignment: options.align || AlignmentType.LEFT,
        children: [
          new TextRun({
            text: String(text),
            bold: options.bold || false,
            size: 18,
            font: "Times New Roman",
            color: "000000",
          }),
        ],
      }),
    ],
  });

// ─── Imzo cell ────────────────────────────────────────────────────────────────
const makeSignCell = (title, fullName) =>
  new TableCell({
    borders: noBorders,
    width: { size: 3120, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 80, right: 80 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: title,
            bold: true,
            size: 20,
            font: "Times New Roman",
            color: "000000",
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 200 },
        children: [
          new TextRun({
            text: "________________",
            size: 20,
            font: "Times New Roman",
            color: "000000",
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 80 },
        children: [
          new TextRun({
            text: `(${fullName})`,
            size: 18,
            font: "Times New Roman",
            color: "000000",
          }),
        ],
      }),
    ],
  });

// ─── Nakladnoy yaratish ───────────────────────────────────────────────────────
export const generateNakladnoyWord = async ({
  number,
  date,
  agent,
  clientName,
  comment,
  cart,
  totalSum,
}) => {
  // Ustun kengliklar (jami = 9360 DXA — A4 content width)
  const colWidths = {
    num: 500,
    name: 4260,
    qty: 900,
    unit: 700,
    price: 1000,
    total: 2000,
  };
  const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);

  // ─── Mahsulot qatorlari ───────────────────────────────────────────────────
  const productRows = cart.map((item, index) => {
    const rowShading = index % 2 === 0 ? "FFFFFF" : "F2F2F2";
    return new TableRow({
      children: [
        makeCell(index + 1, colWidths.num, {
          align: AlignmentType.CENTER,
          shading: rowShading,
        }),
        makeCell(item.name, colWidths.name, { shading: rowShading }),
        makeCell(item.quantity, colWidths.qty, {
          align: AlignmentType.CENTER,
          shading: rowShading,
        }),
        makeCell(item.unit, colWidths.unit, {
          align: AlignmentType.CENTER,
          shading: rowShading,
        }),
        makeCell(item.price.toLocaleString(), colWidths.price, {
          align: AlignmentType.RIGHT,
          shading: rowShading,
        }),
        makeCell(
          (item.price * item.quantity).toLocaleString(),
          colWidths.total,
          {
            align: AlignmentType.RIGHT,
            bold: true,
            shading: rowShading,
          }
        ),
      ],
    });
  });

  // ─── Jami qatori ─────────────────────────────────────────────────────────
  const totalRow = new TableRow({
    children: [
      new TableCell({
        borders,
        width: {
          size:
            colWidths.num +
            colWidths.name +
            colWidths.qty +
            colWidths.unit +
            colWidths.price,
          type: WidthType.DXA,
        },
        columnSpan: 5,
        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "ИТОГО:",
                bold: true,
                size: 22,
                font: "Times New Roman",
                color: "000000",
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        borders,
        width: { size: colWidths.total, type: WidthType.DXA },
        shading: { fill: "D9D9D9", type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: `${totalSum.toLocaleString()} сом`,
                bold: true,
                size: 22,
                font: "Times New Roman",
                color: "000000",
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // ─── Mahsulotlar jadvali ──────────────────────────────────────────────────
  const productTable = new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths: Object.values(colWidths),
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          makeHeaderCell("№", colWidths.num),
          makeHeaderCell("Наименование товара", colWidths.name),
          makeHeaderCell("Кол-во", colWidths.qty),
          makeHeaderCell("Ед.", colWidths.unit),
          makeHeaderCell("Цена", colWidths.price),
          makeHeaderCell("Сумма", colWidths.total),
        ],
      }),
      ...productRows,
      totalRow,
    ],
  });

  // ─── Imzo jadvali (3 ustun) ───────────────────────────────────────────────
  const signTable = new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths: [3120, 3120, 3120],
    rows: [
      new TableRow({
        children: [
          makeSignCell("Отпустил (склад):", "склад"),
          makeSignCell("Агент:", agent.fulName),
          makeSignCell("Получил (клиент):", clientName),
        ],
      }),
    ],
  });

  // ─── Hujjat ───────────────────────────────────────────────────────────────
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1000, right: 800, bottom: 1000, left: 800 },
          },
        },
        children: [
          // Sarlavha
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: "НАКЛАДНАЯ",
                bold: true,
                size: 32,
                font: "Times New Roman",
                color: "000000",
              }),
            ],
          }),

          // Raqam va sana
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `№ ${number}   от   ${date}`,
                bold: true,
                size: 24,
                font: "Times New Roman",
                color: "000000",
              }),
            ],
          }),

          // Ajratuvchi chiziq
          new Paragraph({
            spacing: { after: 120 },
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
            },
            children: [new TextRun({ text: "" })],
          }),

          // Agent
          makeParagraph(`Агент:   ${agent.fulName}   (${agent.phone})`, {
            bold: true,
            size: 22,
            spacingAfter: 80,
          }),
          makeParagraph(`Регион:   ${agent.region}`, {
            size: 20,
            spacingAfter: 80,
          }),

          // Mijoz
          makeParagraph(`Клиент:   ${clientName}`, {
            bold: true,
            size: 22,
            spacingAfter: 80,
          }),

          // Kommentariya
          ...(comment
            ? [
                makeParagraph(`Комментарий:   ${comment}`, {
                  size: 20,
                  spacingAfter: 160,
                }),
              ]
            : [new Paragraph({ spacing: { after: 160 } })]),

          // Mahsulotlar jadvali
          productTable,

          // Bo'sh joy
          new Paragraph({ spacing: { after: 500 } }),

          // Imzo jadvali
          signTable,
        ],
      },
    ],
  });

  // ─── Yuklab olish ─────────────────────────────────────────────────────────
  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, `Накладная_№${number}_${date.replace(/\./g, "-")}.docx`);
};
