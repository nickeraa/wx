-- ============================================================
-- 增量脚本：客户信息新增收款账户（开户人/开户行/银行卡号），用于收寄卖货款
-- 变更点：
--   1) JMJM_ORDER 新增 3 列：BANK_USER / BANK_NAME / BANK_ACCOUNT
--   2) jmjm_order_updcust 存储过程增加 3 个参数
-- 执行：DBA 在 espos 用户下执行（幂等，可重复运行）
-- 关联后端：wx_jmjm_sign（保存）/ wx_jmjm_info（回显）
-- ============================================================

-- 1) 主表新增收款账户列（已存在则跳过）
DECLARE
    v_cnt NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_cnt FROM user_tab_columns
     WHERE table_name = 'JMJM_ORDER' AND column_name = 'BANK_USER';
    IF v_cnt = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE JMJM_ORDER ADD (BANK_USER VARCHAR2(100))';
    END IF;
END;
/

DECLARE
    v_cnt NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_cnt FROM user_tab_columns
     WHERE table_name = 'JMJM_ORDER' AND column_name = 'BANK_NAME';
    IF v_cnt = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE JMJM_ORDER ADD (BANK_NAME VARCHAR2(200))';
    END IF;
END;
/

DECLARE
    v_cnt NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_cnt FROM user_tab_columns
     WHERE table_name = 'JMJM_ORDER' AND column_name = 'BANK_ACCOUNT';
    IF v_cnt = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE JMJM_ORDER ADD (BANK_ACCOUNT VARCHAR2(60))';
    END IF;
END;
/

-- 2) 更新"保存客户填写信息"存储过程（增加收款账户 3 参数）
CREATE OR REPLACE PROCEDURE jmjm_order_updcust (
    v_orderno  IN VARCHAR2,
    v_name     IN VARCHAR2,
    v_phone    IN VARCHAR2,
    v_idcard   IN VARCHAR2,
    v_addr     IN VARCHAR2,
    v_bankuser IN VARCHAR2,
    v_bankname IN VARCHAR2,
    v_bankacct IN VARCHAR2
) AS
BEGIN
    UPDATE JMJM_ORDER
       SET CUST_NAME    = v_name,
           CUST_PHONE   = v_phone,
           CUST_IDCARD  = v_idcard,
           CUST_ADDR    = v_addr,
           BANK_USER    = v_bankuser,
           BANK_NAME    = v_bankname,
           BANK_ACCOUNT = v_bankacct
     WHERE ORDER_NO = v_orderno;
END jmjm_order_updcust;
/

-- 验证
-- SELECT column_name, data_type, data_length FROM user_tab_columns
--  WHERE table_name = 'JMJM_ORDER' AND column_name LIKE 'BANK%';
-- 期望：BANK_USER / BANK_NAME / BANK_ACCOUNT 三行
