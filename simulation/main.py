import logging
from dotenv import load_dotenv
from .simulator import Simulator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def main():
    """Main entry point for the simulation"""
    # Load environment variables
    load_dotenv()
    
    logger.info("Starting solver competition simulation")
    
    # Create and start the simulator
    simulator = Simulator()
    simulator.start()

if __name__ == "__main__":
    main()
