# Memory Tracer

Memory Tracer is a tool for analyzing memory consumption on Android devices through bug logs reported during the testing phase. The project is a collaboration between UFAM/IComp and Motorola Mobility.

## Overview

The application consists of a frontend developed in React and a backend in Flask. The frontend displays visualizations of memory consumption data processed by the backend.

## Project Structure

project-root/

├── backend/

│   ├── app.py

│   ├── requirements.txt

│   ├── scripts/

│   └── upload/

├── frontend/

│   ├── public/

│   ├── src/

│   ├── package.json

│   ├── package-lock.json

│   └── ...

├── Dockerfile

└── docker-compose.yml

## File

To run tests, you can download a sample bug report file from this link [here](https://drive.google.com/file/d/1evGIqVCUj7PgSST62SgUEyyPZw7caeZO/view?usp=sharing).

## Installation and Execution

### Prerequisites

- Docker
- Docker Compose

### Steps to Build and Run

1\. Clone the repository:

```sh
   https://github.com/girlanasouza/VISSOFT2024.git
```

2\. Build the containers:

```sh

docker-compose build

```

3\. Start the containers:

```sh

docker-compose up

```

4\. Access the application:

Open your browser and go to http://localhost:3000.

## Proxy Configuration in Frontend

Ensure that your React frontend package.json contains the proxy configuration to redirect API calls to the Flask backend:

**frontend/package.json:**

```json
{
  "name": "memory-tracer",

  "version": "0.1.0",

  "private": true,

  "proxy": "http://backend:5000",

  "dependencies": {
    // your dependencies
  }
}
```

## Usage

### Upload Logs

1\. Upload the logs in the frontend. The logs will be saved in the `backend/upload` directory.

### Data Visualization

1\. After the upload, you can visualize various memory consumption metrics, including RSS and PSS per process.

### Backend Endpoints

- `/upload`: Endpoint for uploading log files.

- `/file`: Returns the content of the uploaded log file.

- `/amPss`: Returns PSS and RSS data of processes.

- `/reasonDeath`: Returns the reasons for process deaths.

- `/TotalMemory`: Returns the total memory used.

- `/amKill`: Returns information on terminated processes.

## Contribution

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT License [Licença MIT](LICENSE).

## Contact

For more information, contact [Girlana Souza](https://github.com/girlanasouza).

---

© 2024 Memory Tracer | All Rights Reserved to [SWPERFI](https://swperfi.icomp.ufam.edu.br) Project, a partnership between UFAM/IComp and Motorola Mobility.
