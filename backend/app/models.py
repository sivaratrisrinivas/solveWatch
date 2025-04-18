from pydantic import BaseModel, Field
from typing import List, Dict, Any, Generic, TypeVar, Optional
from datetime import datetime

# Generic type for paginated responses
T = TypeVar('T')

class Order(BaseModel):
    """Model for a CoW Protocol order"""
    uid: str
    owner: str
    sellToken: str
    buyToken: str
    sellAmount: str
    buyAmount: str
    validTo: int
    appData: str
    feeAmount: str
    kind: str
    partiallyFillable: bool
    status: str
    creationDate: datetime

class Trade(BaseModel):
    """Model for a CoW Protocol trade"""
    blockNumber: int
    logIndex: int
    orderUid: str
    owner: str
    sellToken: str
    buyToken: str
    sellAmount: str
    buyAmount: str
    sellAmountBeforeFees: Optional[str]
    txHash: str
    timestamp: datetime

class SolverPerformance(BaseModel):
    """Model for inferred solver performance"""
    id: str
    name: str
    tradesCount: int
    avgGasUsed: float
    totalGasUsed: int
    successRate: float

class Metrics(BaseModel):
    """Model for metrics"""
    activeSolversCount: int
    solverPerformance: List[SolverPerformance]
    recentTradesCount: int
    avgPriceImprovement: float

class PaginatedResponse(BaseModel, Generic[T]):
    """Generic model for paginated responses"""
    data: List[T]
    page: int
    pageSize: int
    total: int
    totalPages: int
