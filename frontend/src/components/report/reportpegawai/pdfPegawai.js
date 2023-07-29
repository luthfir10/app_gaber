import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import logo from "../../../assest/images/logo_report.png";

// define a generatePDF function that accepts a tickets argument
const pdfPegawai = (datauser) => {
  // initialize jsPDF
  const doc = new jsPDF();
  const dateTime = new Date();
  const tgl = moment(dateTime).format("L");

  let info = [];
  datauser.forEach((element, index, array) => {
    info.push([
      index + 1,
      element.nip,
      element.nama,
      element.jabatan.nama,
      element.gol,
    ]);
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
  doc.text("Laporan Pegawai", 90, 30);

  doc.autoTable({
    headStyles: {
      lineWidth: 0.4,
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      halign: "center",
    },
    theme: "grid",
    startY: 40,
    head: [["No", "NIP", "Nama", "Jabatan", "Gol"]],
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
      [" ", " ", "Teddy Antonius, S.STP, MM"],
      [" ", " ", "NIP: 19810529 199912 1 002"],
    ],
  });

  // we define the name of our PDF file.
  doc.save(`laporan_pegawai.pdf`);
};

export default pdfPegawai;
