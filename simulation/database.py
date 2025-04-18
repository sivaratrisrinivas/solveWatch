import os
from supabase import create_client, Client
from dotenv import load_dotenv
import logging
from typing import Dict, List, Any, Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

class SupabaseClient:
    """Class to handle Supabase database operations"""
    
    def __init__(self):
        """Initialize the Supabase client"""
        # Use environment variables from Vercel integration
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        
        if not self.supabase_url or not self.supabase_key:
            raise ValueError("Supabase URL and key must be provided in environment variables")
        
        self.client = self._initialize_client()
        
    def _initialize_client(self) -> Client:
        """Initialize and return a Supabase client"""
        try:
            client = create_client(self.supabase_url, self.supabase_key)
            logger.info("Supabase client initialized successfully")
            return client
        except Exception as e:
            logger.error(f"Failed to initialize Supabase client: {e}")
            raise
    
    def get_solvers(self) -> List[Dict[str, Any]]:
        """Get all solvers from the database"""
        try:
            response = self.client.table('solvers').select('*').execute()
            logger.info(f"Retrieved {len(response.data)} solvers from database")
            return response.data
        except Exception as e:
            logger.error(f"Error fetching solvers: {e}")
            return []
    
    def insert_auction(self, timestamp: str, token_pair: str) -> Optional[Dict[str, Any]]:
        """Insert a new auction into the database"""
        try:
            response = self.client.table('auctions').insert({
                "timestamp": timestamp,
                "token_pair": token_pair
            }).execute()
            data = response.data
            if data:
                logger.info(f"Inserted auction: {token_pair} at {timestamp}")
                return data[0]
            else:
                logger.error(f"Failed to insert auction: {token_pair} at {timestamp}")
                return None
        except Exception as e:
            logger.error(f"Error inserting auction: {e}")
            return None
    
    def insert_bid(self, auction_id: str, solver_id: str, bid_amount: float, 
                  gas_used: int, success: bool) -> Optional[Dict[str, Any]]:
        """Insert a new bid into the database"""
        try:
            response = self.client.table('bids').insert({
                "auction_id": auction_id,
                "solver_id": solver_id,
                "bid_amount": bid_amount,
                "gas_used": gas_used,
                "success": success
            }).execute()
            data = response.data
            if data:
                logger.info(f"Inserted bid: {bid_amount} from solver {solver_id}")
                return data[0]
            else:
                logger.error(f"Failed to insert bid from solver {solver_id}")
                return None
        except Exception as e:
            logger.error(f"Error inserting bid: {e}")
            return None
