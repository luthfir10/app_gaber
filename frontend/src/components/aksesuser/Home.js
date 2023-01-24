import { Card, Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Header>Home</Card.Header>
            <Card.Body>
              <Card.Text>
                {process.env.REACT_APP_API_URL}
                Pemerintah Provinsi Sumatera Barat mengalokasikan Rp380 miliar
                untuk Tambahan Penghasilan Pegawai (TPP) pada 2023, naik sekitar
                Rp 130 miliar dari anggaran 2022 yang mencapai Rp258 miliar.
              </Card.Text>
              <Card.Text>
                “Tunjangan ini untuk memotivasi ASN untuk meningkatkan kinerja
                agar lebih baik dari tahun sebelumnya. Ini sekaligus untuk
                meningkatkan pelayanan kepada masyarakat," kata Gubernur Sumbar,
                Mahyeldi di Padang, Jumat.
              </Card.Text>
              <Card.Text>
                Tujuan utama pemberian TPP ini bagi PNS di Daerah, yakni:
              </Card.Text>

              <table>
                <tbody>
                  <tr>
                    <td>1. meningkatkan kesejahteraan PNS dan Calon PNS;</td>
                  </tr>
                  <tr>
                    <td>2. meningkatkan kinerja PNS dan Calon PNS;</td>
                  </tr>
                  <tr>
                    <td>3. meningkatkan disiplin PNS dan Calon PNS;</td>
                  </tr>
                  <tr>
                    <td>4. meningkatkan integritas PNS dan Calon PNS;</td>
                  </tr>
                  <tr>
                    <td>
                      5. meningkatkan kualitas pelayanan kepada masyarakat;
                    </td>
                  </tr>
                  <tr>
                    <td>
                      6. meningkatkan tertib administrasi pengelolaan keuangan
                      daerah
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
