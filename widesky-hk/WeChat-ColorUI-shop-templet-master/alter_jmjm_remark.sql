-- =====================================================================
-- 金银币寄卖：整单备注（员工开单时选填）
-- 执行一次即可（字段已存在时会报错，忽略即可）
-- =====================================================================

-- 1) 主表加备注字段（最长500字符）
ALTER TABLE espos.JMJM_ORDER ADD (REMARK VARCHAR2(500));

-- 2) 备注更新存储过程（开单成功后调用）
CREATE OR REPLACE PROCEDURE espos.jmjm_order_updremark (
  v_orderno IN VARCHAR2,
  v_remark  IN VARCHAR2
) AS
BEGIN
  UPDATE espos.JMJM_ORDER
     SET REMARK = v_remark
   WHERE ORDER_NO = v_orderno;
  COMMIT;
END;
/
