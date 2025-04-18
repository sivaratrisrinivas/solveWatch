from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import logging
from datetime import datetime, timedelta
import traceback

from .database import get_db, Database
from .models import Order, Trade, Metrics, PaginatedResponse, SolverPerformance

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="SolveWatch API",
    description="API for the CoW Protocol Solver Competition Dashboard",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint to check if API is running"""
    return {"message": "SolveWatch API is running"}

@app.get("/api/orders", response_model=PaginatedResponse[Order])
async def get_orders(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Database = Depends(get_db),
):
    """Get orders with pagination"""
    try:
        logger.info(f"Fetching orders: page={page}, page_size={page_size}")
        orders, total = await db.get_orders(page, page_size)
        
        # Log the first order to help with debugging
        if orders and len(orders) > 0:
            logger.info(f"First order sample: {orders[0]}")
        else:
            logger.info("No orders returned from database")
            
        return {
            "data": orders,
            "page": page,
            "pageSize": page_size,  # Changed from page_size to pageSize to match frontend expectations
            "total": total,
            "totalPages": (total + page_size - 1) // page_size,
        }
    except Exception as e:
        logger.error(f"Error fetching orders: {e}")
        logger.error(traceback.format_exc())  # Log the full traceback
        raise HTTPException(status_code=500, detail=f"Failed to fetch orders: {str(e)}")

@app.get("/api/orders/{order_id}", response_model=Order)
async def get_order(
    order_id: str,
    db: Database = Depends(get_db),
):
    """Get a specific order by ID"""
    try:
        order = await db.get_order(order_id)
        return order
    except Exception as e:
        logger.error(f"Error fetching order {order_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch order {order_id}")

@app.get("/api/trades", response_model=List[Trade])
async def get_trades(
    order_id: Optional[str] = Query(None, description="Filter by order ID"),
    db: Database = Depends(get_db),
):
    """Get trades, optionally filtered by order ID"""
    try:
        trades = await db.get_trades(order_id)
        return trades
    except Exception as e:
        logger.error(f"Error fetching trades: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch trades")

@app.get("/api/solver-performance", response_model=List[SolverPerformance])
async def get_solver_performance(
    db: Database = Depends(get_db),
):
    """Get solver performance metrics"""
    try:
        performance = await db.get_solver_performance()
        return performance
    except Exception as e:
        logger.error(f"Error fetching solver performance: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch solver performance")

@app.get("/api/metrics", response_model=Metrics)
async def get_metrics(
    db: Database = Depends(get_db),
):
    """Get dashboard metrics"""
    try:
        metrics = await db.get_metrics()
        return metrics
    except Exception as e:
        logger.error(f"Error calculating metrics: {e}")
        raise HTTPException(status_code=500, detail="Failed to calculate metrics")

# New endpoints for the remaining components

@app.get("/api/token-pairs")
async def get_token_pairs(
    db: Database = Depends(get_db),
):
    """Get token pairs distribution"""
    try:
        # Using the existing CoW Protocol client to get data
        # This would need to be implemented in the Database class
        token_pairs = [
            {"name": "ETH-USDC", "value": 35},
            {"name": "DAI-USDC", "value": 25},
            {"name": "WBTC-USDC", "value": 15},
            {"name": "ETH-DAI", "value": 10},
            {"name": "Other", "value": 15},
        ]
        return token_pairs
    except Exception as e:
        logger.error(f"Error fetching token pairs: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch token pairs")

@app.get("/api/solver-activity")
async def get_solver_activity(
    db: Database = Depends(get_db),
):
    """Get solver activity timeline"""
    try:
        # Generate timestamps for the last 24 hours, one per hour
        now = datetime.now()
        solvers = await db.get_solver_performance()
        
        # Generate activity data for each solver
        result = []
        for solver in solvers[:3]:  # Limit to top 3 solvers for clarity
            data_points = []
            for i in range(24):
                timestamp = now - timedelta(hours=23-i)
                # In a real implementation, this would query actual trade data
                data_points.append({
                    "timestamp": timestamp.isoformat(),
                    "trades": max(0, round(solver["tradesCount"] / 24 * (0.8 + 0.4 * (i % 3))))
                })
            
            result.append({
                "solver": solver["name"],
                "data": data_points
            })
        
        return result
    except Exception as e:
        logger.error(f"Error fetching solver activity: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch solver activity")

@app.get("/api/trade-volume")
async def get_trade_volume(
    db: Database = Depends(get_db),
):
    """Get trade volume over time"""
    try:
        # Generate timestamps for the last 7 days, one per day
        now = datetime.now()
        
        # In a real implementation, this would query actual trade data
        result = []
        for i in range(7):
            timestamp = now - timedelta(days=6-i)
            # Simulate some realistic volume data
            volume = 50 + 30 * (i / 6) + 20 * ((i % 3) / 3)
            result.append({
                "timestamp": timestamp.isoformat(),
                "volume": volume
            })
        
        return result
    except Exception as e:
        logger.error(f"Error fetching trade volume: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch trade volume")

@app.get("/api/gas-usage")
async def get_gas_usage(
    db: Database = Depends(get_db),
):
    """Get gas usage by solver"""
    try:
        solvers = await db.get_solver_performance()
        
        # Extract gas usage data from solver performance
        result = []
        for solver in solvers:
            result.append({
                "name": solver["name"],
                "avgGasUsed": solver["avgGasUsed"]
            })
        
        return result
    except Exception as e:
        logger.error(f"Error fetching gas usage: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch gas usage")

@app.get("/api/token-pairs-analytics")
async def get_token_pairs_analytics(
    db: Database = Depends(get_db),
):
    """Get token pairs analytics"""
    try:
        # In a real implementation, this would query actual trade data
        # For now, we'll return structured mock data that matches what the frontend expects
        token_pairs = [
            {
                "pair": "ETH-USDC",
                "volume": "1,245.32 ETH",
                "trades": 156,
                "avgSlippage": "0.12%",
                "avgGasUsed": "105,234",
            },
            {
                "pair": "DAI-USDC",
                "volume": "985.75 DAI",
                "trades": 124,
                "avgSlippage": "0.08%",
                "avgGasUsed": "92,456",
            },
            {
                "pair": "WBTC-USDC",
                "volume": "42.18 WBTC",
                "trades": 78,
                "avgSlippage": "0.15%",
                "avgGasUsed": "118,765",
            },
            {
                "pair": "ETH-DAI",
                "volume": "356.91 ETH",
                "trades": 67,
                "avgSlippage": "0.14%",
                "avgGasUsed": "102,345",
            },
            {
                "pair": "USDT-USDC",
                "volume": "1,567,890 USDT",
                "trades": 45,
                "avgSlippage": "0.03%",
                "avgGasUsed": "85,234",
            },
        ]
        
        return token_pairs
    except Exception as e:
        logger.error(f"Error fetching token pairs analytics: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch token pairs analytics")
