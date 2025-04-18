import uvicorn
from dotenv import load_dotenv

if __name__ == "__main__":
    # Load environment variables
    load_dotenv()
    
    # Run the FastAPI app with uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
