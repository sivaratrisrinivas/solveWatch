#!/usr/bin/env python3
"""
Script to run the solver competition simulation.
"""
import logging
from simulation.main import main

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    main()
