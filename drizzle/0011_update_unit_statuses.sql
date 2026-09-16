-- Set the current commercial status for Venecia units 701 and 502.
UPDATE units SET state = 'SOLD', updated_at = unixepoch()
WHERE id = 'unit_7_701' AND identifier = '701';

UPDATE units SET state = 'RESERVED', updated_at = unixepoch()
WHERE id = 'unit_5_502' AND identifier = '502';
