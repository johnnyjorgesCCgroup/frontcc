import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
import "admin-lte/dist/js/adminlte.min.js";
import { useAuth } from "./AuthContext";
import $ from "jquery";
import { Link } from "react-router-dom";

const Menu = () => {
  const treeviewRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const { isLoggedIn, logout } = useAuth();
  const storedUsername = localStorage.getItem('username');

  useEffect(() => {
    $(treeviewRef.current).Treeview("init");
    $(treeviewRef.current).on("treeview:opened", (event, openedItem) => {
      if (activeItem && activeItem !== openedItem) {
        $(activeItem).Treeview("close");
      }
      setActiveItem(openedItem);
    });
    $(treeviewRef.current).on("treeview:closed", () => {
      setActiveItem(null);
    });
  }, [activeItem]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="app-container">
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/" className="brand-link text-center">
          <img
            src="../public/logoblanco.png"
            alt="AdminLTE Logo"
            className="brand-image elevation-3 float-lg-none"
            style={{ opacity: ".8" }}
          />
          <br></br>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel" style={{ textAlign: "center" }}>
            <div className="info">
              <p href="#" style={{ color: "#D6B855", textAlign: "center" }}>
                <b>{isLoggedIn ? storedUsername : "Invitado"}</b>
              </p>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              ref={treeviewRef} // Asigna el ref al elemento que deseas seleccionar
              className="nav nav-pills nav-sidebar flex-column flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="true"
            >
              <li
                className={`nav-item ${location.pathname === "/dashboard" || "/dashgeneral" || "/dashproductos" ? "menu-open" : ""
                  }`}
              >
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-chart-simple" />
                  <p>
                    Dashboard
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link
                      to="/dashgeneral"
                      className={`nav-link ${location.pathname === "/dashgeneral" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>General</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Estados</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/dashproductos"
                      className={`nav-link ${location.pathname === "/dashproductos" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Productos</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item ${location.pathname === "/ticket" || "/activos" || "ventas" || "colaborador" ? "menu-open" : ""
                  }`}
              >
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Formulario
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link
                      to="/ventas"
                      className={`nav-link ${location.pathname === "/ventas" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Ventas</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/colaborador"
                      className={`nav-link ${location.pathname === "/colaborador" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Colaborador</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/ticket"
                      className={`nav-link ${location.pathname === "/ticket" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Ticket</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/activos"
                      className={`nav-link ${location.pathname === "/activos" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Activos</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item ${location.pathname === "/fechasrapidas" || "registroMoto" ? "menu-open" : ""
                  }`}
              >
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-table" />
                  <p>
                    Logistica
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link
                      to="/fechasrapidas"
                      className={`nav-link ${location.pathname === "/fechasrapidas" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Fechas Rapidas</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/registroMoto"
                      className={`nav-link ${location.pathname === "/registroMoto" ? "active" : ""
                        }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Registro de Moto</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="nav-link"
              >
                <a href="https:/cvimport.com"><i className="nav-icon fas fa-solid fa-link"></i> Ir a cvimport.com</a>
              </li>
              <Link
                onClick={() => {
                  handleLogout();
                  history.push("/");
                }}
                className="nav-link"
              >
                <i className="nav-icon fas fa-solid fa-right-from-bracket" />
                <p> Logout</p>
              </Link>
              <li
                className="nav-link" style={{ fontSize: "50px", display: "flex", justifyContent: "flex-end" }}
              >
                <a className="cerrarMenu2" data-widget="pushmenu" role="button"><i className="nav-icon fas fa-caret-left"></i></a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Menu;
