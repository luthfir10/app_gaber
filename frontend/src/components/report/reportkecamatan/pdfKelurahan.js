import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import logo from "../../../assest/images/logo_report.png";

// define a generatePDF function that accepts a tickets argument
const pdfKelurahan = (datauser) => {
  // initialize jsPDF
  const doc = new jsPDF();
  const dateTime = new Date();
  const tgl = moment(dateTime).format("L");

  let info = [];
  datauser.forEach((element, index, array) => {
    info.push([index + 1, element.kode, element.nama, element.alamat]);
  });

  // data title. and margin-top + margin-left
  doc.setFont("Arial");
  doc.setFontSize(13);
  doc.setTextColor(10);
  doc.addImage(logo, "PNG", 40, 9);
  doc.text("Pemerintah Kota Padang", 85, 15);
  doc.text("Kecamatan Padang Selatan", 83, 20);
  doc.line(10, 22, 200, 22);
  doc.line(10, 23, 200, 23);
  doc.text("Laporan Kecamatan/Kelurahan", 80, 30);

  doc.autoTable({
    headStyles: {
      lineWidth: 0.4,
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      halign: "center",
    },
    theme: "grid",
    startY: 40,
    head: [["No", "Kode Kelurahan", "Nama Kelurahan", "Alamat"]],
    body: info,
  });

  doc.autoTable({
    theme: "grid",
    pageBreak: "avoid",
    rowPageBreak: "avoid",
    bodyStyles: {
      textColor: [0, 0, 0],
      lineWidth: 0,
      halign: "center",
    },
    columnStyles: {
      0: {
        cellWidth: 100,
      },
      2: {
        cellWidth: 50,
      },
    },
    body: [
      [" ", " ", "Padang " + tgl],
      [" ", " ", "Camat Padang Selatan"],
      [""],
      [""],
      [" ", " ", "Jasman, S.Sos, MM"],
      [" ", " ", "NIP: 19690204 199503 1 003"],
    ],
  });

  // we define the name of our PDF file.
  doc.save(`laporan_kelurahan.pdf`);
};

export default pdfKelurahan;
