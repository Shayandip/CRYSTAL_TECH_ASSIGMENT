import * as fs from 'fs-extra';
import * as PDFDocument from 'pdfkit';
import * as QRCode from 'qrcode';

const titleFontSize = 15;
const subTitleFontSize = 12;
const leadingFontSize = 10;
const contentFontSize = 8;

export async function createInvoice(invoice) {
  let doc = new PDFDocument({ size: [4 * 72, 10 * 72], margin: 20 });

  const fileDir = './uploads/qr';
  const fileName = fileDir + '/' + Date.now().toString() + '.png';
  await fs.ensureDir(fileDir);
  await QRCode.toFile(fileName, 'https://zeocart.com');

  generateHeader(doc, fileName, invoice);
  generateOrderInformation(doc, invoice);
  generateCompanyInformation(doc, invoice);
  // generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);
  await fs.unlink(fileName);
  return doc;
  // doc.end();
  // doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, fileName: string, invoice) {
  doc
    .fillColor('#444444')
    .fontSize(titleFontSize)
    .font('Helvetica-Bold')
    .text('Invoice', { align: 'center' })
    .image(fileName, 170, 30, {
      align: 'right',
      width: 100,
      height: 100,
    })
    .fontSize(subTitleFontSize)
    .font('Helvetica')
    .text('https://zeocart.com', 23, 50)
    .fontSize(leadingFontSize)
    .font('Helvetica-Bold')
    .text('Shipping Address:', 23, 65)
    .fontSize(contentFontSize)
    .font('Helvetica-Bold')
    .text(invoice.shipping.name, 23, 80)
    .font('Helvetica')
    .text(invoice.shipping.address, 23, 90)
    .text(
      invoice.shipping.city +
        ', ' +
        invoice.shipping.state +
        ', ' +
        invoice.shipping.country,
      23,
      100,
    )
    .moveDown();
}

async function generateOrderInformation(doc, invoice) {
  const customerInformationTop = 130;

  doc
    .fontSize(contentFontSize)
    .font('Helvetica-Bold')
    .text(`GST NO : ${invoice.sellerDetails.gstNo}`, 25, customerInformationTop)
    .text(
      `Shipment Id: ${invoice.sellerDetails.shipmentId}`,
      25,
      customerInformationTop + 10,
    )
    .text(
      `Order No: ${invoice.sellerDetails.orderNo}`,
      25,
      customerInformationTop + 20,
    )
    .text(
      `Place Of Supply: ${invoice.sellerDetails.placeOfSupply}`,
      25,
      customerInformationTop + 30,
    )

    .text(
      `Invoice NO: ${invoice.sellerDetails.invoiceNo}`,
      150,
      customerInformationTop,
    )
    .text(
      `Invoice Date: ${invoice.sellerDetails.orderDate}`,
      150,
      customerInformationTop + 10,
    )
    .text(
      `Order Date: ${invoice.sellerDetails.orderDate}`,
      150,
      customerInformationTop + 20,
    )
    .moveDown();

  generateHr(doc, 252);
}

async function generateCompanyInformation(doc, invoice) {
  const customerInformationTop = 180;

  doc
    .fontSize(contentFontSize)
    .font('Helvetica')
    .text(
      'Sold By: Sold by JIORE MOBILE PRIVATE LIMITED C/9 Street 4 Aram Park Delhi 110031',
      25,
      customerInformationTop,
    )
    .moveDown();

  doc
    .fontSize(contentFontSize)
    .font('Helvetica')
    .text(
      'Dispatched From JIORE MOBILE PRIVATE LIMITED C/9 Street 4 Aram Park Delhi 110031',
      25,
      customerInformationTop + 30,
    )
    .moveDown();

  // generateHr(doc, 252);
}

// async function generateCustomerInformation(doc, invoice) {
//   doc
//     .fillColor('#444444')
//     .fontSize(subTitleFontSize)
//     .text('Invoice', 23, 200, { align: 'left' });

//   generateHr(doc, 200);

//   const customerInformationTop = 210;

//   doc
//     .fontSize(contentFontSize)
//     .text('Invoice Number:', 25, customerInformationTop)
//     .font('Helvetica-Bold')
//     .text(invoice.invoice_nr, 100, customerInformationTop)
//     .font('Helvetica')
//     .text('Invoice Date:', 25, customerInformationTop + 10)
//     .text(formatDate(new Date()), 100, customerInformationTop + 10)
//     .text('Balance Due:', 25, customerInformationTop + 20)
//     .text(
//       formatCurrency(invoice.subtotal - invoice.paid),
//       100,
//       customerInformationTop + 20,
//     )

//     .font('Helvetica-Bold')
//     .text(invoice.shipping.name, 150, customerInformationTop, {
//       align: 'right',
//     })
//     .font('Helvetica')
//     .text(invoice.shipping.address, 150, customerInformationTop + 10, {
//       align: 'right',
//     })
//     .text(
//       invoice.shipping.city +
//         ', ' +
//         invoice.shipping.state +
//         ', ' +
//         invoice.shipping.country,
//       150,
//       customerInformationTop + 20,
//       { align: 'right' },
//     )
//     .moveDown();

//   generateHr(doc, 252);
// }

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 260;

  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Qty',
    'Mrp',
    'Disc.',
    'Total',
  );
  generateHr(doc, invoiceTableTop + 15);
  doc.font('Helvetica');

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 20;
    generateTableRow(
      doc,
      position,
      item.item,
      item.quantity,
      item.amount,
      item.discount,
      item.total,
    );

    generateHr(doc, position + 15);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 20;
  generateTableTotal(
    doc,
    subtotalPosition,
    'Sub Total',
    formatCurrency(invoice.subtotal),
  );

  const cGSTPosition = subtotalPosition + 10;
  generateTableTotal(doc, cGSTPosition, 'CGST', '9%');

  const sGSTPosition = cGSTPosition + 10;
  generateTableTotal(doc, sGSTPosition, 'SGST', '9%');

  const scPosition = sGSTPosition + 10;
  generateTableTotal(
    doc,
    scPosition,
    'Shipping Charge',
    formatCurrency(invoice.shippingCharge),
  );

  const totalPosition = scPosition + 10;
  doc.font('Helvetica-Bold');
  generateTableTotal(
    doc,
    totalPosition,
    'Total Amt.',
    formatCurrency(invoice.total),
  );
  doc.font('Helvetica');

  const paidPosition = totalPosition + 10;
  doc.font('Helvetica-Bold');
  generateTableTotal(
    doc,
    paidPosition,
    'Paid Amt.',
    formatCurrency(invoice.paid),
  );
  doc.font('Helvetica');

  const duePosition = paidPosition + 10;
  doc.font('Helvetica-Bold');
  generateTableTotal(doc, duePosition, 'Due Amt.', formatCurrency(invoice.due));
  doc.font('Helvetica');

  const refundedPosition = duePosition + 10;
  doc.font('Helvetica-Bold');
  generateTableTotal(
    doc,
    refundedPosition,
    invoice.refunded > 0 ? 'Refund Amt.' : '',
    invoice.refunded > 0 ? formatCurrency(invoice.refunded) : '',
  );
  doc.font('Helvetica');
}

function generateFooter(doc) {
  doc
    .fontSize(contentFontSize)
    .font('Helvetica-Bold')
    .text('Not For Resale', 25, 450, { align: 'left' })
    .font('Helvetica')
    .text('Thank you being Zeocart.com', 25, 460, { align: 'left' })
    .text(
      'Keep shopping & enjoying benefits. This is computer generated invoice and requires no signature & stamp',
      25,
      470,
      { align: 'left' },
    )
    .text('Registered office. C/9 Stress 4 Aram Park Delhi', 25, 490, {
      align: 'left',
    })
    .moveDown();
}

function generateTableRow(doc, y, item, qty, mrp, disc, total) {
  doc
    .fontSize(contentFontSize)
    .text(item, 25, y, { width: 100, align: 'left' })
    .text(qty, 140, y, { width: 30, align: 'left' })
    .text(mrp, 170, y, { width: 30, align: 'left' })
    .text(disc, 200, y, { width: 30, align: 'left' })
    .text(total, 230, y, { width: 30, align: 'left' });
}

function generateTableTotal(doc, y, title, total) {
  doc
    .fontSize(contentFontSize)
    .text(title, 25, y, { width: 200, align: 'right' })
    .text(total, 230, y, { width: 30, align: 'left' });
}

function generateHr(doc, y) {
  const pageWidth = doc.page.width;
  const centerX = pageWidth / 2;

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(centerX - 120, y) // Adjusting the starting point for centering
    .lineTo(centerX + 120, y) // Adjusting the ending point for centering
    .stroke();
}

function formatCurrency(amount) {
  return amount.toFixed(1);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + '/' + month + '/' + day;
}
