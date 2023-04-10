import { useEffect, useState } from "react";
import { fetchTicketData } from "../../controller/fetchData";
import { useDebounce } from "use-debounce";
import "./index.scss";

function TicketSearching() {
  const [bookingCode, setBookingCode] = useState("");
  const [currentBookingCode, setCurrentBookingCode] = useState("");
  const [value] = useDebounce(bookingCode, 1000);
  const [ticketData, setTicketData] = useState([]);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const fetchTicketWithInvoice = async (e) => {
    const result = await fetchTicketData(e);
    if (result.length) {
      setTicketData(result);
      setTimeout(() => {
        window.print()
      }, 1000)
    }
  };

  useEffect(() => {
    if (value.length && currentBookingCode.length) {
      fetchTicketWithInvoice(value);
    }
  }, [value, currentBookingCode.length]);

  return (
    <div className={`search-container${ticketData.length ? " ticket-list" : ""}`}>
      {ticketData.length ? (
        ticketData.map((e, i) => {
          return (
            <div className="ticket-card" key={i}>
              <header>
                <div>
                  <h2>{e.code_tiket}</h2>
                  <h4>{e.invoice}</h4>
                </div>
                <img src={e.qr_code} alt="qr-code" />
              </header>
              <div className="divider-container">
                <div className="circle"></div>
                <div className="divider"></div>
                <div className="circle right"></div>
              </div>
              <section>
                <section>
                  <h3 className="title">Nama Penumpang</h3>
                  <h3>{e.nama_penumpang}</h3>
                </section>
                <section>
                  <h3 className="title">Telepon Penumpang</h3>
                  <h3>{e.no_tlp_penumpang}</h3>
                </section>
                <section>
                  <h3 className="title">Tanggal Cetak</h3>
                  <h3>{e.tgl_cetak}</h3>
                </section>
                <section>
                  <h3 className="title">Tanggal Transaksi</h3>
                  <h3>{e.tgl_transaksi}</h3>
                </section>
                <div className="divider-container">
                  <div className="circle"></div>
                  <div className="divider"></div>
                  <div className="circle right"></div>
                </div>
                <section>
                  <h3 className="title">Cetak Oleh</h3>
                  <h3>{e.cetak_oleh}</h3>
                </section>
                <section className="row">
                  <section>
                    <h3 className="title">Nama Agen</h3>
                    <h3>{e.agen_name}</h3>
                  </section>
                  <section>
                    <h3 className="title">Kode Agen</h3>
                    <h3>{e.agen_code}</h3>
                  </section>
                </section>
                <section className="row">
                  <section>
                    <h3 className="title">Berangkat</h3>
                    <h3>{e.berangkat}</h3>
                  </section>
                  <section>
                    <h3 className="title">Tujuan</h3>
                    <h3>{e.tujuan}</h3>
                  </section>
                </section>
                <section className="row">
                  <section>
                    <h3 className="title">Nomor Kursi</h3>
                    <h3>{e.no_kursi}</h3>
                  </section>
                  <section>
                    <h3 className="title">Jam Keberangkatan</h3>
                    <h3>{e.jam_berangkat}</h3>
                  </section>
                </section>
                <section className="row">
                  <section>
                    <h3 className="title">Harga Tiket</h3>
                    <h3>{rupiah(e.harga_tiket)}</h3>
                  </section>
                  <section>
                    <h3 className="title">Tipe Bus</h3>
                    <h3>{e.tipe_bus}</h3>
                  </section>
                </section>
              </section>
            </div>
          );
        })
      ) : (
        <div className="search-card">
          <header>
            <h2>Scan QR Code di aplikasi Budiman Mobile</h2>
          </header>
          <input
            onChange={async (e) => {
              setBookingCode(e.target.value);
              setCurrentBookingCode(e.target.value);
            }}
            type={"text"}
            placeholder={"Contoh : INV20230402BDMN"}
          />
          <img src={require("../../logo-budiman.png")} alt="budiman-logo" />
        </div>
      )}
    </div>
  );
}

export default TicketSearching;
