

统计MySQL中某个数据库中有多少张表
```
SELECT COUNT(*) TABLES, table_schema FROM information_schema.TABLES WHERE table_schema = 'dmstore' GROUP BY table_schema; 

SELECT COUNT(TABLE_NAME) FROM information_schema.TABLES WHERE TABLE_SCHEMA='dmstore';  

SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'dmstore';
```












