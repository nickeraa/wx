-- 货品明细查询过程（小程序详情接口 wx_jmjm_info.ashx 调用）：补 PLU 货号列
-- 旧版本建在 PLU 列之前，结果集没有货号列，导致详情页显示「未录入」
-- 注意：与 alter_jmjm_item_plu.sql 第5段的 jmjm_item_list（后台 jmplu 页用）是两个过程
CREATE OR REPLACE PROCEDURE espos.jmjm_order_items (
  mycs      OUT SYS_REFCURSOR,
  v_orderno IN VARCHAR2
) AS
BEGIN
  OPEN mycs FOR
    SELECT ORDER_NO, SEQ, IMG_PATH, GOODS_NAME, PRICE, QTY, NVL(PLU, '') AS PLU
      FROM espos.JMJM_ORDER_ITEM
     WHERE ORDER_NO = v_orderno
     ORDER BY SEQ;
END;
/
