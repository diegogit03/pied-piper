import React from 'react'

export default () => {
    return (
        <div class="col-sm-auto bg-dark text-light sticky-top">
            <div class="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top justify-content-between h-100">
                <a
                    href="/"
                    class="d-block p-3 link-success text-decoration-none"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Icon-only"
                >
                    <h1>P</h1>
                </a>
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                    <li class="nav-item">
                        <a
                            href="#"
                            class="nav-link text-white py-3 px-2"
                            title="Arquivos"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="Arquivos"
                        >
                            <i class="bi bi-files fs-1"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            href="#"
                            class="nav-link text-white py-3 px-2"
                            title=""
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="Home"
                        >
                            <i class="bi bi-people-fill fs-1"></i>
                        </a>
                    </li>
                </ul>
                <div class="dropdown">
                    <a
                        href="#"
                        class="d-flex align-items-center justify-content-center p-3 text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser3"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i class="bi-person-circle h2"></i>
                    </a>
                    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                        <li>
                            <a class="dropdown-item" href="/logout">
                                Sair
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
