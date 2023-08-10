import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import logo from "../../../assest/images/logo_report.png";

// define a generatePDF function that accepts a tickets argument
const pdfAbsen = (datauser, bulan, tahun) => {
  // initialize jsPDF
  const doc = new jsPDF();
  const dateTime = new Date();
  const tgl = moment(dateTime).format("L");

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
      element.tk,
      element.ta,
      element.tms,
      element.jum_pot,
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
  doc.text(`Laporan Absen ${bulanh} ${tahun}`, 80, 30);

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
        "Tanpa Keterangan",
        "Tidak Apel",
        "Tidak Senam",
        "Potongan",
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
  doc.save(`laporan_absen.pdf`);
};

export default pdfAbsen;
