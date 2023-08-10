import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import logo from "../../../assest/images/logo_report.png";

// define a generatePDF function that accepts a tickets argument
const pdfTpp = (datauser, bulan, tahun) => {
  // initialize jsPDF
  const doc = new jsPDF("landscape");
  const dateTime = new Date();
  const tgl = moment(dateTime).format("L");
  const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  let bulanh = "";
  switch (parseInt(bulan)) {
    case 1:
      bulanh = "Januari";
      break;
    case 2:
      bulanh = "Februari";
      break;
    case 3:
      bulanh = "Maret";
      break;
    case 4:
      bulanh = "April";
      break;
    case 5:
      bulanh = "Mei";
      break;
    case 6:
      bulanh = "Juni";
      break;
    case 7:
      bulanh = "Juli";
      break;
    case 8:
      bulanh = "Agustus";
      break;
    case 9:
      bulanh = "September";
      break;
    case 10:
      bulanh = "Oktober";
      break;
    case 11:
      bulanh = "November";
      break;
    case 12:
      bulanh = "Desember";
      break;
    default:
      break;
  }

  let info = [];
  datauser.forEach((element, index, array) => {
    info.push([
      index + 1,
      element.nip,
      element.pegawai.nama,
      element.pegawai.gol,
      currencyFormat(parseInt(element.saldo_tpp)),
      currencyFormat(parseInt(element.harkeha)),
      currencyFormat(parseInt(element.tottppkot)),
      currencyFormat(parseInt(element.pajak)),
      currencyFormat(parseInt(element.bpjs)),
      currencyFormat(parseInt(element.tottppber)),
    ]);
  });

  // data title. and margin-top + margin-left
  doc.setFont("Arial");
  doc.setFontSize(13);
  doc.setTextColor(10);
  doc.addImage(logo, "PNG", 40, 9);
  doc.text("Pemerintah Kota Padang", 126, 15);
  doc.text("Kecamatan Padang Selatan", 124, 20);
  doc.line(10, 22, 286, 22);
  doc.line(10, 23, 286, 23);
  doc.text(`Laporan TPP ${bulanh} ${tahun}`, 127, 30);

  doc.autoTable({
    headStyles: {
      lineWidth: 0.4,
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      halign: "center",
    },
    theme: "grid",
    startY: 40,
    head: [
      [
        "No",
        "NIP",
        "Nama",
        "Gol",
        "TPP",
        "Kehadiran",
        "TPP Kotor",
        "Pajak",
        "BPJS",
        "TPP Bersih",
      ],
    ],
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
  doc.save(`laporan_tpp.pdf`);
};

export default pdfTpp;
