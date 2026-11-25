
import React, { useState } from "react";

export default function App() {
  const [filter, setFilter] = useState("All");
  const [reports, setReports] = useState([]);
  const [checklist, setChecklist] = useState([false, false, false, false, false]);
  const [form, setForm] = useState({
    type: "Flood",
    location: "",
    description: "",
  });

  const initialAlerts = [
    { id: 1, type: "Flood", location: "Hyderabad", level: "High", time: "10 mins ago", icon: "🌊", description: "Heavy rainfall and rising water levels reported." },
    { id: 2, type: "Cyclone", location: "Visakhapatnam", level: "Medium", time: "25 mins ago", icon: "🌀", description: "Strong winds expected along coastal areas." },
    { id: 3, type: "Earthquake", location: "Vijayawada", level: "Low", time: "1 hour ago", icon: "🌍", description: "Minor seismic activity detected." },
    { id: 4, type: "Fire", location: "Guntur", level: "High", time: "2 hours ago", icon: "🔥", description: "Fire incident reported. Stay away from the area." },
  ];

  const alerts = [...reports, ...initialAlerts];

  const filteredAlerts =
    filter === "All" ? alerts : alerts.filter((a) => a.level === filter);

  const completed = checklist.filter(Boolean).length;

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.location.trim() || !form.description.trim()) {
      alert("Please enter location and description.");
      return;
    }

    const level =
      form.type === "Flood" || form.type === "Fire"
        ? "High"
        : form.type === "Cyclone"
        ? "Medium"
        : "Low";

    const newReport = {
      id: Date.now(),
      type: form.type,
      location: form.location,
      level,
      time: "Just now",
      icon:
        form.type === "Flood" ? "🌊" :
        form.type === "Cyclone" ? "🌀" :
        form.type === "Earthquake" ? "🌍" : "🔥",
      description: form.description,
    };

    setReports((prev) => [newReport, ...prev]);
    setForm({ type: "Flood", location: "", description: "" });
    alert("Emergency report submitted successfully!");
  }

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0b1120",
      color: "#e8eef8",
      fontFamily: "Arial, sans-serif",
    },
    nav: {
      height: "70px",
      padding: "0 7%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#111a2c",
      borderBottom: "1px solid #25334a",
      flexWrap: "wrap",
    },
    logo: {
      color: "#45d6c5",
      fontSize: "22px",
      fontWeight: "bold",
    },
    button: {
      background: "#20bfa9",
      color: "#081521",
      border: "none",
      padding: "12px 20px",
      borderRadius: "9px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    container: {
      maxWidth: "1200px",
      margin: "auto",
      padding: "35px 20px",
    },
    card: {
      background: "#141e31",
      border: "1px solid #25344d",
      borderRadius: "16px",
      padding: "22px",
    },
    smallTitle: {
      color: "#96a9c4",
      fontSize: "13px",
      marginBottom: "10px",
    },
    heading: {
      fontSize: "26px",
      margin: "0 0 8px",
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px",
      background: "#0b1425",
      border: "1px solid #2a3b56",
      borderRadius: "8px",
      color: "#fff",
      marginTop: "8px",
      marginBottom: "15px",
      outline: "none",
    },
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={styles.logo}>🛡️ DisasterGuard</div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{ color: "#a7b7cc" }}>Dashboard</span>
          <span style={{ color: "#a7b7cc" }}>Alerts</span>
          <span style={{ color: "#a7b7cc" }}>Preparedness</span>
        </div>
        <button style={styles.button} onClick={() => document.getElementById("report").scrollIntoView({ behavior: "smooth" })}>
          + Report Emergency
        </button>
      </nav>

      <main style={styles.container}>
        {/* HERO */}
        <section style={{
          ...styles.card,
          padding: "35px",
          background: "linear-gradient(120deg,#16344b,#143e49,#15243b)",
          marginBottom: "25px"
        }}>
          <div style={{ color: "#52dfc8", fontWeight: "bold", marginBottom: "12px" }}>
            ● DISASTER MANAGEMENT SYSTEM
          </div>
          <h1 style={{ fontSize: "36px", margin: "0 0 12px" }}>
            Stay Alert. Stay Safe.
          </h1>
          <p style={{ color: "#c2d1e3", maxWidth: "650px", lineHeight: 1.7 }}>
            Monitor disaster alerts, report emergencies, and access safety information.
            Be prepared and protect your community with DisasterGuard.
          </p>
          <button style={styles.button} onClick={() => document.getElementById("alerts").scrollIntoView({ behavior: "smooth" })}>
            View Live Alerts ↓
          </button>
        </section>

        {/* STAT CARDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
          gap: "16px",
          marginBottom: "25px"
        }}>
          {[
            ["📋", "Total Reports", alerts.length, "#53b8ff"],
            ["🔴", "High Risk", alerts.filter(a => a.level === "High").length, "#ff6576"],
            ["🟠", "Medium Risk", alerts.filter(a => a.level === "Medium").length, "#ffb454"],
            ["🟢", "Preparedness", `${completed}/${checklist.length}`, "#49d7b0"],
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <div style={{ fontSize: "25px" }}>{item[0]}</div>
              <div style={styles.smallTitle}>{item[1]}</div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: item[3] }}>{item[2]}</div>
            </div>
          ))}
        </div>

        {/* ALERTS */}
        <section id="alerts" style={{ ...styles.card, marginBottom: "25px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 style={styles.heading}>🚨 Disaster Alerts</h2>
              <p style={{ color: "#9aabc3" }}>Monitor and track reported incidents</p>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["All", "High", "Medium", "Low"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: "9px 15px",
                  borderRadius: "8px",
                  border: "1px solid #33445f",
                  background: filter === f ? "#20bfa9" : "#0c1728",
                  color: filter === f ? "#071721" : "#c5d3e5",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
            {filteredAlerts.map((alert) => (
              <div key={alert.id} style={{
                background: "#0d1728",
                border: "1px solid #263750",
                padding: "17px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap"
              }}>
                <div style={{ fontSize: "35px" }}>{alert.icon}</div>
                <div style={{ flex: 1, minWidth: "180px" }}>
                  <strong style={{ fontSize: "17px" }}>{alert.type}</strong>
                  <div style={{ color: "#9aabc3", marginTop: "5px" }}>📍 {alert.location}</div>
                  <div style={{ color: "#8093ad", fontSize: "13px", marginTop: "5px" }}>{alert.description}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    background: alert.level === "High" ? "#4a202e" : alert.level === "Medium" ? "#49351d" : "#153d35",
                    color: alert.level === "High" ? "#ff7484" : alert.level === "Medium" ? "#ffbd65" : "#56ddb5"
                  }}>{alert.level} Risk</span>
                  <div style={{ fontSize: "12px", color: "#8294ad", marginTop: "9px" }}>{alert.time}</div>
                </div>
              </div>
            ))}
            {filteredAlerts.length === 0 && <p>No alerts in this category.</p>}
          </div>
        </section>

        {/* REPORT FORM + CHECKLIST */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
          marginBottom: "25px"
        }}>
          <section id="report" style={styles.card}>
            <h2 style={styles.heading}>📝 Report an Emergency</h2>
            <p style={{ color: "#9aabc3" }}>Share incident details with the community</p>
            <form onSubmit={handleSubmit}>
              <label>Disaster Type</label>
              <select style={styles.input} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option>Flood</option>
                <option>Cyclone</option>
                <option>Earthquake</option>
                <option>Fire</option>
              </select>

              <label>Location</label>
              <input style={styles.input} placeholder="Enter city or location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />

              <label>Description</label>
              <textarea style={{ ...styles.input, minHeight: "100px", resize: "vertical" }} placeholder="Describe the emergency..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

              <button type="submit" style={{ ...styles.button, width: "100%" }}>Submit Emergency Report</button>
            </form>
          </section>

          <section style={styles.card}>
            <h2 style={styles.heading}>🎒 Safety Checklist</h2>
            <p style={{ color: "#9aabc3" }}>Prepare your emergency kit</p>
            {[
              "Drinking water",
              "First aid kit",
              "Torch and batteries",
              "Emergency food",
              "Important documents",
            ].map((item, index) => (
              <label key={index} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px",
                background: "#0c1728",
                marginBottom: "10px",
                borderRadius: "9px",
                cursor: "pointer",
                color: checklist[index] ? "#52dfc8" : "#c6d3e4",
                textDecoration: checklist[index] ? "line-through" : "none"
              }}>
                <input type="checkbox" checked={checklist[index]} onChange={() => setChecklist(old => old.map((v, i) => i === index ? !v : v))} />
                {item}
              </label>
            ))}
            <div style={{ background: "#0b1425", height: "9px", borderRadius: "20px", marginTop: "20px", overflow: "hidden" }}>
              <div style={{ width: `${completed / checklist.length * 100}%`, background: "#20bfa9", height: "100%", transition: "0.3s" }} />
            </div>
            <p style={{ color: "#52dfc8", fontSize: "13px" }}>{completed} of 5 items completed</p>
          </section>
        </div>

        {/* EMERGENCY CONTACTS */}
        <section style={styles.card}>
          <h2 style={styles.heading}>☎️ Emergency Contacts - India</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "12px", marginTop: "20px" }}>
            {[
              ["112", "All Emergencies"],
              ["108", "Ambulance"],
              ["101", "Fire Services"],
            ].map((contact, i) => (
              <div key={i} style={{ background: "#0c1728", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <div style={{ color: "#52dfc8", fontSize: "28px", fontWeight: "bold" }}>{contact[0]}</div>
                <div style={{ color: "#a3b5cc", marginTop: "8px" }}>{contact[1]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ textAlign: "center", color: "#73859e", padding: "30px 10px" }}>
          <div style={{ color: "#45d6c5", fontWeight: "bold", marginBottom: "8px" }}>🛡️ DisasterGuard</div>
          Disaster Management & Community Safety Platform
          <p style={{ fontSize: "12px" }}>Hackathon Prototype • Stay Alert, Stay Safe</p>
        </footer>
      </main>
    </div>
  );
}
