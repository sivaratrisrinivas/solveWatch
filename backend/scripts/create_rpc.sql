-- Create RPC function to get active solvers
CREATE OR REPLACE FUNCTION get_active_solvers(auction_ids UUID[])
RETURNS SETOF solvers AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT s.*
    FROM solvers s
    JOIN bids b ON s.id = b.solver_id
    WHERE b.auction_id = ANY(auction_ids);
END;
$$ LANGUAGE plpgsql;
