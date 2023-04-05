import { useState } from "react";
import { fetchTicketData } from "../../controller/fetchData";
import "./index.scss";

function TicketSearching() {
  const [bookingCode, setBookingCode] = useState("");
  const [errorFetch, setErrorFetch] = useState(false);
  const [ticketData, setTicketData] = useState({});

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <div className="search-container">
      {Object.keys(ticketData).length ? (
        <div className="ticket-card">
          <header>
            <div>
              <h2>{ticketData.code_tiket}</h2>
              <h4>{ticketData.invoice}</h4>
            </div>
            <img src={ticketData.qr_code} />
          </header>
          <div className="divider-container">
            <div className="circle"></div>
            <div className="divider"></div>
            <div className="circle right"></div>
          </div>
          <section>
            <section>
              <h3 className="title">Nama Penumpang</h3>
              <h3>{ticketData.nama_penumpang}</h3>
            </section>
            <section>
              <h3 className="title">Telepon Penumpang</h3>
              <h3>{ticketData.no_tlp_penumpang}</h3>
            </section>
            <section>
              <h3 className="title">Tanggal Cetak</h3>
              <h3>{ticketData.tgl_cetak}</h3>
            </section>
            <section>
              <h3 className="title">Tanggal Transaksi</h3>
              <h3>{ticketData.tgl_transaksi}</h3>
            </section>
            <div className="divider-container">
              <div className="circle"></div>
              <div className="divider"></div>
              <div className="circle right"></div>
            </div>
            <section>
              <h3 className="title">Cetak Oleh</h3>
              <h3>{ticketData.cetak_oleh}</h3>
            </section>
            <section className="row">
              <section>
                <h3 className="title">Nama Agen</h3>
                <h3>{ticketData.agen_name}</h3>
              </section>
              <section>
                <h3 className="title">Kode Agen</h3>
                <h3>{ticketData.agen_code}</h3>
              </section>
            </section>
            <section className="row">
              <section>
                <h3 className="title">Berangkat</h3>
                <h3>{ticketData.berangkat}</h3>
              </section>
              <section>
                <h3 className="title">Tujuan</h3>
                <h3>{ticketData.tujuan}</h3>
              </section>
            </section>
            <section className="row">
              <section>
                <h3 className="title">Nomor Kursi</h3>
                <h3>{ticketData.no_kursi}</h3>
              </section>
              <section>
                <h3 className="title">Jam Keberangkatan</h3>
                <h3>{ticketData.jam_berangkat}</h3>
              </section>
            </section>
            <section className="row">
              <section>
                <h3 className="title">Harga Tiket</h3>
                <h3>{rupiah(ticketData.harga_tiket)}</h3>
              </section>
              <section>
                <h3 className="title">Tipe Bus</h3>
                <h3>{ticketData.tipe_bus}</h3>
              </section>
            </section>
          </section>
        </div>
      ) : (
        <div className="search-card">
          <header>
            <h2>Masukkan Kode Booking / Pembayaran</h2>
            <h4>Enter Book Code / Payment Code</h4>
          </header>
          <input
            onChange={(e) => {
              setBookingCode(e.target.value);
            }}
            type={"text"}
            placeholder={"Contoh: T130822190921"}
          />
          {errorFetch && <h4>Tolong masukan Kode Booking</h4>}
          <div className="button-container">
            <div
              onClick={async () => {
                if (!bookingCode.trim().length) {
                  setErrorFetch(true);
                  return;
                }
                setErrorFetch(false);
                const result = await fetchTicketData(bookingCode);
                setTicketData(result);
              }}
              className="button"
            >
              <span class="material-symbols-outlined">search</span>
              <div>
                <h5>Cari Tiket Saya</h5>
                <h6>Search My Ticket</h6>
              </div>
              <span class="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketSearching;
