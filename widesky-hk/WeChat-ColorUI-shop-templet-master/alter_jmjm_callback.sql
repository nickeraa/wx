-- ============================================================
-- 增量脚本：电子签回调按 FlowId 更新单据状态
-- 变更点：新增存储过程 jmjm_order_updflow_status
--   按 FLOW_ID 定位单据，仅当当前 STATUS=1（待签署）时更新为 2/9
--   （防乱序回退：已签署完成/已失败的单据不被回调覆盖）
--   v_cnt OUT 返回受影响行数（0=未命中或状态不满足）
-- 执行：DBA 在 espos 用户下执行（可重复运行）
-- 关联后端：wx_jmjm_callback.ashx.cs
-- ============================================================

CREATE OR REPLACE PROCEDURE jmjm_order_updflow_status (
    v_flowid  IN VARCHAR2,
    v_status  IN NUMBER,
    v_failmsg IN VARCHAR2,
    v_cnt     OUT NUMBER
) AS
BEGIN
    v_cnt := 0;
    UPDATE JMJM_ORDER
       SET STATUS       = v_status,
           FAIL_MSG     = DECODE(v_status, 9, v_failmsg, NULL),
           SIGN_TIME    = DECODE(v_status, 2, SYSDATE, SIGN_TIME)
     WHERE FLOW_ID = v_flowid
       AND STATUS = 1;
    v_cnt := SQL%ROWCOUNT;
    COMMIT;
END jmjm_order_updflow_status;
/

-- 验证
-- SELECT ORDER_NO, STATUS, FLOW_ID, SIGN_TIME FROM JMJM_ORDER WHERE FLOW_ID IS NOT NULL AND ROWNUM <= 5;
