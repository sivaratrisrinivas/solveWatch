# SolveWatch: CoW Protocol Solver Dashboard

## Description

SolveWatch is a web dashboard designed to provide real-time monitoring and analytics for solver activity within the CoW Protocol ecosystem. It offers insights into solver performance, recent trades, token pair distribution, and overall network metrics.

## Why SolveWatch?

CoW Protocol relies on a competitive network of solvers to find the best settlement solutions for user trades. Understanding how these solvers perform, what trades are happening, and which token pairs are most active is crucial for users, developers, and researchers involved in the ecosystem. Existing tools might not offer a consolidated, real-time view focused specifically on solver competition dynamics.

SolveWatch aims to fill this gap by providing a user-friendly interface to:

*   Track key performance indicators (KPIs) for different solvers.
*   Observe recent order flow and settlement activity.
*   Analyze trends in trade volume, gas usage, and popular token pairs.
*   Monitor the overall health and status of the connected CoW Protocol API.

This project was built to offer a clear, accessible window into the operational side of CoW Protocol's settlement layer.

## 🚀 Quick Start

The easiest way to use SolveWatch is via the deployed web application:

**[View the Live Dashboard](https://solve-watch.vercel.app/dashboard)**

## 📖 Usage

Once you access the dashboard, you can navigate through different sections using the sidebar:

*   **Dashboard Overview:** Provides a high-level summary with key metrics like active solvers, recent trades, and average price improvement.
*   **Solvers:** Focuses on solver-specific data, including performance comparisons (success rate, gas usage) and activity timelines.
*   **Analytics:** Shows broader market trends like overall trade volume, gas usage patterns across solvers, and detailed analytics for specific token pairs.
*   **Orders:** Displays a list of recent orders processed through the protocol.
*   **Settings:** Allows configuration of dashboard preferences (like data refresh interval) and includes an API debugging tool.

## 🤝 Contributing & Local Development

Interested in running the project locally or contributing?

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn
*   Python (v3.8 or later recommended)
*   pip
*   Git

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sivaratrisrinivas/solveWatch.git
    cd solveWatch
    ```

2.  **Backend Setup (Python/FastAPI):**
    ```bash
    cd backend

    # Create and activate a virtual environment (recommended)
    python -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`

    # Install dependencies
    pip install -r requirements.txt

    # Create a .env file (copy .env.example)
    # Add your Supabase URL and Service Role Key if using Supabase integration
    # cp .env.example .env 
    # nano .env 

    # Run the backend server
    uvicorn app.main:app --reload --port 8000
    ```
    The backend API will be available at `http://localhost:8000`.

3.  **Frontend Setup (Next.js):**
    *Open a new terminal window/tab.*
    ```bash
    cd frontend

    # Install dependencies
    npm install # or yarn install

    # Create a .env.local file (copy .env.local.example if it exists, or create new)
    # Ensure NEXT_PUBLIC_API_URL points to your running backend (http://localhost:8000/api)
    # Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY if needed
    # Example .env.local:
    # NEXT_PUBLIC_API_URL=http://localhost:8000/api
    # NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    # NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

    # Run the frontend development server
    npm run dev # or yarn dev
    ```
    The frontend will be available at `http://localhost:3000`.

### Running Tests

*(Add instructions here if you have tests set up, e.g., `npm run test` or `pytest`)*

### Submitting Changes

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request to the `main` branch.
