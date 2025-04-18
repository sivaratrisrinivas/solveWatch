import os
from supabase import create_client, Client
from typing import List, Dict, Any, Tuple, Optional
import logging
import json
import requests
from datetime import datetime, timedelta
import traceback

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

class CowProtocolClient:
    """Client for interacting with CoW Protocol API"""
    
    def __init__(self):
        """Initialize the CoW Protocol client"""
        # Base URLs for CoW Protocol API
        self.api_url = "https://api.cow.fi/mainnet/api/v1"
        
    async def get_orders(self, page: int = 1, page_size: int = 10) -> Tuple[List[Dict[str, Any]], int]:
        """Get orders with pagination"""
        try:
            # Note: The actual API doesn't have a direct method to fetch all orders with pagination
            # This is a simplified implementation that would need to be replaced with proper API calls
            # or integration with a subgraph/indexer
            
            # For demo purposes, we'll return mock data
            mock_orders = []
            for i in range((page - 1) * page_size, page * page_size):
                order_id = f"0x{i:064x}"
                mock_orders.append({
                    "uid": order_id,
                    "id": order_id,  # Adding id field for compatibility
                    "owner": f"0x{i+1:040x}",
                    "sellToken": "0x6b175474e89094c44da98b954eedeac495271d0f",  # DAI
                    "buyToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",  # USDC
                    "sellAmount": str(1000000000000000000 * (i + 1)),  # 1 DAI * (i+1)
                    "buyAmount": str(990000000 * (i + 1)),  # 0.99 USDC * (i+1)
                    "validTo": int(datetime.now().timestamp()) + 3600,
                    "appData": "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "feeAmount": "1000000000000000",
                    "kind": "sell",
                    "partiallyFillable": False,
                    "status": ["open", "fulfilled", "expired", "cancelled"][i % 4],
                    "creationDate": (datetime.now() - timedelta(minutes=i*10)).isoformat()
                })
            
            total = 100  # Mock total
            return mock_orders, total
        except Exception as e:
            logger.error(f"Error fetching orders: {e}")
            logger.error(traceback.format_exc())  # Log the full traceback
            raise
    
    async def get_order(self, order_id: str) -> Dict[str, Any]:
        """Get a specific order by ID"""
        try:
            # In a real implementation, this would call the CoW Protocol API
            # For demo purposes, we'll return mock data
            return {
                "uid": order_id,
                "owner": f"0x{int(order_id[-8:], 16):040x}",
                "sellToken": "0x6b175474e89094c44da98b954eedeac495271d0f",  # DAI
                "buyToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",  # USDC
                "sellAmount": "1000000000000000000",  # 1 DAI
                "buyAmount": "990000000",  # 0.99 USDC
                "validTo": int(datetime.now().timestamp()) + 3600,
                "appData": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "feeAmount": "1000000000000000",
                "kind": "sell",
                "partiallyFillable": False,
                "status": "fulfilled",
                "creationDate": (datetime.now() - timedelta(minutes=30)).isoformat()
            }
        except Exception as e:
            logger.error(f"Error fetching order {order_id}: {e}")
            raise
    
    async def get_trades(self, order_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get trades, optionally filtered by order ID"""
        try:
            # In a real implementation, this would call the CoW Protocol API
            # For demo purposes, we'll return mock data
            mock_trades = []
            for i in range(5):
                trade_id = f"{i}"
                mock_trades.append({
                    "blockNumber": 15000000 + i,
                    "logIndex": i,
                    "orderUid": order_id or f"0x{i:064x}",
                    "owner": f"0x{i+1:040x}",
                    "sellToken": "0x6b175474e89094c44da98b954eedeac495271d0f",  # DAI
                    "buyToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",  # USDC
                    "sellAmount": str(1000000000000000000),  # 1 DAI
                    "buyAmount": str(990000000 + i * 1000000),  # 0.99 USDC + improvement
                    "sellAmountBeforeFees": "1010000000000000000",
                    "txHash": f"0x{i+100:064x}",
                    "timestamp": (datetime.now() - timedelta(minutes=i*5)).isoformat()
                })
            
            return mock_trades
        except Exception as e:
            logger.error(f"Error fetching trades: {e}")
            raise
    
    async def get_solver_performance(self) -> List[Dict[str, Any]]:
        """Infer solver performance from trade data"""
        try:
            # In a real implementation, this would analyze trade data to infer solver behavior
            # For demo purposes, we'll return mock data
            mock_solvers = []
            for i in range(5):
                solver_id = f"solver-{i}"
                mock_solvers.append({
                    "id": solver_id,
                    "name": f"Solver {i+1}",
                    "tradesCount": 10 + i * 5,
                    "avgGasUsed": 100000 + i * 10000,
                    "totalGasUsed": (100000 + i * 10000) * (10 + i * 5),
                    "successRate": 0.7 + i * 0.05
                })
            
            return mock_solvers
        except Exception as e:
            logger.error(f"Error calculating solver performance: {e}")
            raise

# Database class for Supabase (for storing historical data)
class Database:
    """Database access layer for Supabase"""
    
    def __init__(self):
        """Initialize the Supabase client"""
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        
        if not self.supabase_url or not self.supabase_key:
            raise ValueError("Supabase URL and key must be provided in environment variables")
        
        self.client = self._initialize_client()
        self.cow_client = CowProtocolClient()
    
    def _initialize_client(self) -> Client:
        """Initialize and return a Supabase client"""
        try:
            client = create_client(self.supabase_url, self.supabase_key)
            logger.info("Supabase client initialized successfully")
            return client
        except Exception as e:
            logger.error(f"Failed to initialize Supabase client: {e}")
            raise
    
    async def get_orders(self, page: int = 1, page_size: int = 10) -> Tuple[List[Dict[str, Any]], int]:
        """Get orders with pagination"""
        return await self.cow_client.get_orders(page, page_size)
    
    async def get_order(self, order_id: str) -> Dict[str, Any]:
        """Get a specific order by ID"""
        return await self.cow_client.get_order(order_id)
    
    async def get_trades(self, order_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get trades, optionally filtered by order ID"""
        return await self.cow_client.get_trades(order_id)
    
    async def get_solver_performance(self) -> List[Dict[str, Any]]:
        """Get solver performance metrics"""
        return await self.cow_client.get_solver_performance()
    
    async def get_metrics(self) -> Dict[str, Any]:
        """Get dashboard metrics"""
        try:
            # Get solver performance
            solver_performance = await self.get_solver_performance()
            
            # Get recent trades
            recent_trades = await self.get_trades()
            
            # Calculate metrics
            metrics = {
                "activeSolversCount": len(solver_performance),
                "solverPerformance": solver_performance,
                "recentTradesCount": len(recent_trades),
                "avgPriceImprovement": 0.02  # Mock value
            }
            
            return metrics
        except Exception as e:
            logger.error(f"Error calculating metrics: {e}")
            raise

# Dependency to get database instance
def get_db():
    """Dependency to get database instance"""
    db = Database()
    return db
