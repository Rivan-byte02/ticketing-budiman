import { useEffect, useState } from "react";
import { fetchTicketData } from "../../controller/fetchData";
import { useDebounce } from "use-debounce";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function TicketSearching() {
  const [bookingCode, setBookingCode] = useState("");
  const [value] = useDebounce(bookingCode, 1000);
  const [isError, setIsError] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const navigate = useNavigate();

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const fetchTicketWithInvoice = async (e) => {
    console.log(e);
    if (!e.length) {
      setIsError(true);
      return;
    }
    setIsError(false);
    const result = await fetchTicketData(e);
    if (result.length) {
      setTicketData(result);
    }
  };
  
  return (
    <div className={`search-container`}>
      {ticketData.length ? (
        <div>
          <header
            onClick={() => {
              setTicketData([]);
            }}
          >
            <span class="material-symbols-outlined">arrow_back</span>
            <div>
              <h3>Cari Tiket</h3>
              <h5>Search Ticket</h5>
            </div>
          </header>
          <div className="tabel-section">
            <div>
              <table cellpadding="0" cellspacing="0" border="0">
                <thead className="tbl-header">
                  <tr>
                    <th>Kode Tiket</th>
                    <th>No. Bis</th>
                    <th>Naik Dari Agen</th>
                    <th>Turun Di</th>
                    <th>Nama</th>
                  </tr>
                </thead>
                <tbody className="tbl-content">
                  {ticketData.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{e.code_tiket}</td>
                        <td>{e.code_unit}</td>
                        <td>{e.agen_titik_naik}</td>
                        <td>{e.agen_titik_turun}</td>
                        <td>{e.nama_penumpang}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className={`ticket-container ${
              ticketData.length ? " ticket-list" : ""
            }`}
          >
            <div className="tickets">
              {ticketData.map((e, i) => {
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
                          <h3>{e.agen_titik_naik}</h3>
                        </section>
                        <section>
                          <table>
                            <tr>
                              <td>
                                <section>
                                  <h3 className="title">Jalur</h3>
                                  <h3 style={{ color: "transparent" }}>
                                    {e.no_kursi}
                                  </h3>
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
              })}
            </div>
            <div className="button-section">
              <button
                onClick={() => {
                  navigate(`/print-ticket/${value}`);
                }}
                className="button-container"
              >
                <span class="material-symbols-outlined">print</span>
                <div>
                  <h3>Cari Tiket</h3>
                  <h5>Print Ticket</h5>
                </div>
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <section className="search-section">
          <div className="search-card">
            <header>
              <div>
                <h2>Masukan Kode Booking / Pembayaran</h2>
                <h4>Enter Booking Code / Payment Code</h4>
              </div>
            </header>
            <input
              onChange={async (e) => {
                setBookingCode(e.target.value);
                // setCurrentBookingCode(e.target.value);
              }}
              type={"text"}
              placeholder={"Contoh : INV20230402BDMN"}
            />
            {isError && <h5>Harap Masukan Kode Booking / Pembayaran</h5>}
            <div className="footer-container">
              <img src={require("../../logo-budiman.png")} alt="budiman-logo" />
              <button
                onClick={() => {
                  fetchTicketWithInvoice(value);
                }}
                className="button-container"
              >
                <span class="material-symbols-outlined">search</span>
                <div>
                  <h3>Cari Tiket Saya</h3>
                  <h5>Search My Ticket</h5>
                </div>
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default TicketSearching;
