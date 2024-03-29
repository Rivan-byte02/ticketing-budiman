import { useEffect, useState } from "react";
import { fetchTicketData } from "../../controller/fetchData";
import { useDebounce } from "use-debounce";
import "./index.scss";
import { useParams } from "react-router-dom";

function TicketPrint() {
  let params = useParams()
  const [bookingCode, setBookingCode] = useState("");
  const [value] = useDebounce(bookingCode, 1000);
  const [isError, setIsError] = useState(false)
  const [ticketData, setTicketData] = useState([]);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const fetchTicketWithInvoice = async () => {
    console.log(params);
    if (!params.invoiceId.length) {
      setIsError(true)
      return
    }
    setIsError(false)
    const result = await fetchTicketData(params.invoiceId);
    if (result.length) {
      setTicketData(params.index === "all" ? result : [result[params.index]]);
      setTimeout(() => {
        window.print({ silent: true });
      }, 1000);
    }
  };

  useEffect(() => {
    fetchTicketWithInvoice(value);
  }, []);

  return (
    <div
      className={`print-container${ticketData.length ? " ticket-list" : ""}`}
    >
      {ticketData.length ? (
        ticketData.map((e, i) => {
          return (
            <div className="ticket-card" key={i}>
              <header>
                <img
                  className="budiman"
                  src={require("../../BUDIMAN.png")}
                  alt="budiman-logo"
                />
                <div className="qr-section">
                  <img src={e.qr_code} alt="qr-code" />
                  <p>{e.code_tiket}</p>
                </div>
              </header>
              <section>
                <section>
                  <h3 className="bus-code">{`${e.tipe_bus} (${e.code_bus})`}</h3>
                </section>
                <table>
                  <tr>
                    <th colSpan={2}>
                      <h3>{`${e.berangkat} - ${e.tujuan}`}</h3>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <section>
                        <h3 className="title">Jam Keberangkatan</h3>
                        <h3>{e.jam_berangkat}</h3>
                      </section>
                    </td>
                    <td>
                      <section>
                        <h3 className="title">Tanggal Keberangkatan</h3>
                        <h3>{e.tanggal_berangkat}</h3>
                      </section>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <section>
                        <h3 className="title">Bis</h3>
                        <h3>{e.code_unit}</h3>
                      </section>
                    </td>
                    <td>
                      <section>
                        <h3 className="title">Harga Tiket</h3>
                        <h3>{rupiah(e.harga_tiket)}</h3>
                      </section>
                    </td>
                  </tr>
                </table>
                <section className="row">
                  <section>
                    <h3 className="title">Naik Dari Agen:</h3>
                    <h3>{(e.agen_titik_naik)}</h3>
                  </section>
                  <section>
                    <table>
                    <tr>
                      <td>
                        <section>
                          <h3 className="title">Jalur</h3>
                          <h3 style={{ color: "transparent"}}>{e.no_kursi}</h3>
                        </section>
                      </td>
                      <td>
                        <section>
                          <h3 className="title">No. Kursi</h3>
                          <h3>{e.no_kursi}</h3>
                        </section>
                      </td>
                    </tr>
                  </table>
                  </section>
                </section>
                <section>
                  <h3 className="title">Turun di</h3>
                  <h3>{e.agen_titik_turun}</h3>
                </section>
                <section className="penumpang">
                  <table>
                    <tr>
                      <td>Nama</td>
                      <td>:{e.nama_penumpang}</td>
                    </tr>
                    <tr>
                      <td>No. Telp</td>
                      <td>:{e.no_tlp_penumpang}</td>
                    </tr>
                    <tr>
                      <td className="invoice sm">Invoice</td>
                      <td className="invoice sm">:{e.invoice}</td>
                    </tr>
                    <tr>
                      <td className="sm">Trans Via</td>
                      <td className="sm">:{e.trans_via}</td>
                    </tr>
                    <tr>
                      <td className="sm">Tgl Trans</td>
                      <td className="sm">:{e.tgl_transaksi}</td>
                    </tr>
                    <tr>
                      <td className="sm">Tgl Cetak</td>
                      <td className="sm">:{e.tgl_cetak}</td>
                    </tr>
                    <tr>
                      <td className="sm">Di Cetak Oleh</td>
                      <td className="sm">:{e.cetak_oleh}</td>
                    </tr>
                  </table>
                </section>
              </section>
            </div>
          );
        })
      ) : (
        null
      )}
    </div>
  );
}

export default TicketPrint;
