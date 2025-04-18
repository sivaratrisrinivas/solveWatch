import random
import datetime
from typing import List, Dict, Any, Optional
import logging
from .config import (
    TOKEN_PAIRS, MIN_BID_AMOUNT, MAX_BID_AMOUNT, 
    MIN_GAS_USED, MAX_GAS_USED, SUCCESS_PROBABILITY,
    MIN_BIDS_PER_AUCTION, MAX_BIDS_PER_AUCTION
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DataGenerator:
    """Class to generate simulated data for solver competition"""
    
    def __init__(self, db_client):
        """Initialize the data generator with a database client"""
        self.db_client = db_client
        self.solvers = []
        self._load_solvers()
    
    def _load_solvers(self):
        """Load existing solvers from the database"""
        self.solvers = self.db_client.get_solvers()
        if not self.solvers:
            logger.error("No solvers found in the database")
        else:
            logger.info(f"Loaded {len(self.solvers)} solvers from database")
    
    def generate_auction(self) -> Optional[Dict[str, Any]]:
        """Generate a new auction with current timestamp and random token pair"""
        timestamp = datetime.datetime.now().isoformat()
        token_pair = random.choice(TOKEN_PAIRS)
        
        auction = self.db_client.insert_auction(timestamp, token_pair)
        return auction
    
    def generate_bids(self, auction_id: str) -> List[Dict[str, Any]]:
        """Generate random bids for an auction"""
        if not self.solvers:
            logger.error("No solvers available to generate bids")
            return []
        
        # Determine how many bids to generate
        num_bids = random.randint(MIN_BIDS_PER_AUCTION, MAX_BIDS_PER_AUCTION)
        
        # Ensure we don't try to generate more bids than we have solvers
        num_bids = min(num_bids, len(self.solvers))
        
        # Randomly select solvers without repetition
        selected_solvers = random.sample(self.solvers, num_bids)
        
        bids = []
        for solver in selected_solvers:
            # Generate random bid data
            bid_amount = round(random.uniform(MIN_BID_AMOUNT, MAX_BID_AMOUNT), 2)
            gas_used = random.randint(MIN_GAS_USED, MAX_GAS_USED)
            success = random.random() < SUCCESS_PROBABILITY
            
            # Insert bid into database
            bid = self.db_client.insert_bid(
                auction_id=auction_id,
                solver_id=solver['id'],
                bid_amount=bid_amount,
                gas_used=gas_used,
                success=success
            )
            
            if bid:
                bids.append(bid)
        
        return bids
