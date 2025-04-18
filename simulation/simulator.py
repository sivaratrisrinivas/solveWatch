import time
import signal
import sys
import logging
from typing import Optional
from .database import SupabaseClient
from .data_generator import DataGenerator
from .config import SIMULATION_INTERVAL

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class Simulator:
    """Class to run the simulation loop"""
    
    def __init__(self):
        """Initialize the simulator"""
        self.running = False
        self.db_client = None
        self.data_generator = None
        
    def initialize(self):
        """Initialize the database client and data generator"""
        try:
            self.db_client = SupabaseClient()
            self.data_generator = DataGenerator(self.db_client)
            
            logger.info("Simulator initialized successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to initialize simulator: {e}")
            return False
    
    def start(self):
        """Start the simulation loop"""
        if not self.db_client or not self.data_generator:
            if not self.initialize():
                logger.error("Could not start simulator due to initialization failure")
                return
        
        self.running = True
        logger.info("Starting simulation loop")
        
        # Set up signal handlers for graceful shutdown
        signal.signal(signal.SIGINT, self.handle_shutdown)
        signal.signal(signal.SIGTERM, self.handle_shutdown)
        
        try:
            while self.running:
                self.run_simulation_step()
                time.sleep(SIMULATION_INTERVAL)
        except Exception as e:
            logger.error(f"Error in simulation loop: {e}")
            self.stop()
    
    def run_simulation_step(self):
        """Run a single step of the simulation"""
        try:
            # Generate a new auction
            auction = self.data_generator.generate_auction()
            
            if not auction:
                logger.error("Failed to generate auction")
                return
            
            # Generate bids for the auction
            bids = self.data_generator.generate_bids(auction['id'])
            
            logger.info(f"Generated auction {auction['id']} with {len(bids)} bids")
        except Exception as e:
            logger.error(f"Error in simulation step: {e}")
    
    def stop(self):
        """Stop the simulation loop"""
        logger.info("Stopping simulation")
        self.running = False
    
    def handle_shutdown(self, signum: int, frame: Optional[object]):
        """Handle shutdown signals"""
        logger.info(f"Received signal {signum}, shutting down gracefully")
        self.stop()
        sys.exit(0)
