import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import logo from "../../../assest/images/logo_report.png";

// define a generatePDF function that accepts a tickets argument
const GeneratPdf = (datatpp) => {
  const dateTime = new Date();
  const tgl = moment(dateTime).format("L");
  const currencyFormat = (num) => {
    return "Rp" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  let bulanh = "";
  switch (datatpp.bulan) {
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
  // initialize jsPDF
  const doc = new jsPDF();

  // data title. and margin-top + margin-left
  doc.setFont("Arial");
  doc.setFontSize(13);
  doc.setTextColor(10);
  doc.addImage(logo, "PNG", 40, 9);
  doc.text("Pemerintah Kota Padang", 85, 15);
  doc.text("Kecamatan Padang Selatan", 83, 20);
  doc.line(10, 22, 200, 22);
  doc.line(10, 23, 200, 23);
  doc.text(`Rincian TPP ${bulanh} ${datatpp.tahun}`, 84, 30);
  doc.text("NIP", 14, 45);
  doc.text(`: ${datatpp.nip}`, 75, 45);
  doc.text("Nama", 14, 55);
  doc.text(`: ${datatpp.pegawai.nama}`, 75, 55);
  doc.text("SKP", 14, 65);
  doc.text(`: ${currencyFormat(parseInt(datatpp.harskp))}`, 75, 65);
  doc.text("Kehadiran", 14, 75);
  doc.text(`: ${currencyFormat(parseInt(datatpp.harkeha))}`, 75, 75);
  doc.text("TPP Kotor", 14, 85);
  doc.text(`: ${currencyFormat(parseInt(datatpp.tottppkot))}`, 75, 85);
  doc.text("Pemotongan Pajak", 24, 95);
  doc.text(`: ${currencyFormat(parseInt(datatpp.pajak))}`, 75, 95);
  doc.text("Pemotongan BPJS", 24, 105);
  doc.text(`: ${currencyFormat(parseInt(datatpp.bpjs))}`, 75, 105);
  doc.text("Pemotongan Iuran Sosial", 24, 115);
  doc.text(`: ${currencyFormat(parseInt(datatpp.iur_sos))}`, 75, 115);
  doc.text("Pemotongan Lain-Lain", 24, 125);
  doc.text(`: ${currencyFormat(parseInt(datatpp.pemot_ll))}`, 75, 125);
  doc.text("TPP Bersih", 24, 135);
  doc.text(`: ${currencyFormat(parseInt(datatpp.tottppber))}`, 75, 135);

  doc.autoTable({
    startY: 170,
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
  doc.save(`rincianTPP_${datatpp.nip}.pdf`);
};

export default GeneratPdf;
