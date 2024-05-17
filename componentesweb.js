class MyWebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                }
                button {
                    margin-right: 5px;
                }
            </style>
            <div>
                <button id="listar">Listar</button>
                <button id="crear">Crear</button>
                <button id="editar">Editar</button>
                <button id="eliminar">Eliminar</button>
                <button id="otros">...</button>
                <table id="dataTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        `;

        this.data = [
            { "id": 1, "username": "user1", "saldo": 1000 },
            { "id": 2, "username": "user2", "saldo": 2000 },
            { "id": 3, "username": "user3", "saldo": 3000 }
        ];

        this.dataTable = this.shadowRoot.querySelector('#dataTable tbody');

        this.shadowRoot.querySelector('#listar').addEventListener('click', this.listar.bind(this));
        this.shadowRoot.querySelector('#crear').addEventListener('click', this.crear.bind(this));
        this.shadowRoot.querySelector('#editar').addEventListener('click', this.editar.bind(this));
        this.shadowRoot.querySelector('#eliminar').addEventListener('click', this.eliminar.bind(this));
    }

    listar() {
        this.renderTable();
    }

    crear() {
        const id = parseInt(prompt('Ingrese ID:'));
        const username = prompt('Ingrese Username:');
        const saldo = parseFloat(prompt('Ingrese Saldo:'));
        const newData = { id, username, saldo };
        this.data.push(newData);
        console.log('Nuevo objeto creado:', newData);
        this.renderTable();
    }

    editar() {
        const id = parseInt(prompt('Ingrese el ID del objeto a editar:'));
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            const oldData = { ...this.data[index] };
            this.data[index].username = prompt('Ingrese nuevo Username:', this.data[index].username);
            this.data[index].saldo = parseFloat(prompt('Ingrese nuevo Saldo:', this.data[index].saldo));
            console.log('Objeto anterior:', oldData);
            console.log('Objeto actualizado:', this.data[index]);
            this.renderTable();
        } else {
            console.log('ID no encontrado.');
        }
    }

    eliminar() {
        const id = parseInt(prompt('Ingrese el ID del objeto a eliminar:'));
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedData = this.data.splice(index, 1)[0];
            console.log('Objeto eliminado:', deletedData);
            this.renderTable();
        } else {
            console.log('ID no encontrado.');
        }
    }

    renderTable() {
        this.dataTable.innerHTML = '';
        this.data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.username}</td>
                <td>${item.saldo}</td>
            `;
            this.dataTable.appendChild(row);
        });
    }
}

customElements.define('my-webcomponent', MyWebComponent);
