-- 寄卖合同查询页面（jmht.aspx）数据源：已签署寄卖单列表
-- 一物一码：每件货品一个货号。明细 PLU 存逗号分隔的多个货号（数量2 → 2个货号），
--           查询时按件拆开，一个货号一行
-- 参数：开始/结束日期（按签署时间，YYYY-MM-DD，可空）、订单号（模糊，可空）
CREATE OR REPLACE PROCEDURE espos.jmjm_sign_list (
  mycs        OUT SYS_REFCURSOR,
  v_begindate IN VARCHAR2,
  v_enddate   IN VARCHAR2,
  v_orderno   IN VARCHAR2
) AS
BEGIN
  OPEN mycs FOR
    SELECT o.ORDER_NO, o.SHOP_NO, o.STAFF_ID, o.CUST_NAME,
           i.GOODS_NAME,
           TRIM(REGEXP_SUBSTR(i.PLU, '[^,]+', 1, n.n)) AS PLU,
           i.PRICE, i.QTY,
           TO_CHAR(o.CREATE_TIME, 'YYYY-MM-DD HH24:MI') AS CREATE_TIME,
           TO_CHAR(o.SIGN_TIME, 'YYYY-MM-DD HH24:MI') AS SIGN_TIME,
           o.SIGN_URL
      FROM espos.JMJM_ORDER o
      JOIN espos.JMJM_ORDER_ITEM i ON i.ORDER_NO = o.ORDER_NO
      LEFT JOIN (SELECT LEVEL AS n FROM dual CONNECT BY LEVEL <= 50) n
             ON n.n <= GREATEST(1, REGEXP_COUNT(i.PLU || ',', '[^,]+,'))
     WHERE o.STATUS = 2
       AND (v_orderno IS NULL OR o.ORDER_NO LIKE '%' || v_orderno || '%')
       AND (v_begindate IS NULL OR o.SIGN_TIME >= TO_DATE(v_begindate, 'YYYY-MM-DD'))
       AND (v_enddate IS NULL OR o.SIGN_TIME < TO_DATE(v_enddate, 'YYYY-MM-DD') + 1)
     ORDER BY o.SIGN_TIME DESC, i.SEQ, n.n;
END;
/
