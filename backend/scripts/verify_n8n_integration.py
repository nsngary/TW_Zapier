#!/usr/bin/env python3
"""
n8n 整合驗證腳本
用於驗證 n8n 服務的連線和基本功能
"""

import asyncio
import sys
import json
from pathlib import Path

# 添加專案根目錄到 Python 路徑
sys.path.append(str(Path(__file__).parent.parent))

from app.services.n8n_service import N8nService


async def verify_n8n_connection():
    """驗證 n8n 連線"""
    print("🔍 驗證 n8n 連線...")
    
    async with N8nService() as n8n:
        try:
            is_healthy = await n8n.health_check()
            if is_healthy:
                print("✅ n8n 服務連線成功")
                return True
            else:
                print("❌ n8n 服務連線失敗")
                return False
        except Exception as e:
            print(f"❌ n8n 連線錯誤: {e}")
            return False


async def verify_workflow_operations():
    """驗證工作流操作"""
    print("\n🔍 驗證工作流操作...")
    
    async with N8nService() as n8n:
        try:
            # 1. 取得現有工作流
            workflows = await n8n.get_workflows()
            print(f"✅ 成功取得 {len(workflows)} 個工作流")
            
            # 2. 建立測試工作流
            test_workflow = n8n.create_workflow_json(
                "TW Zapier 測試工作流",
                [
                    n8n.create_node(
                        "start",
                        "Manual Trigger",
                        "n8n-nodes-base.manualTrigger",
                        [240, 300],
                        {}
                    ),
                    n8n.create_node(
                        "set-data",
                        "Set Taiwan Data",
                        "n8n-nodes-base.set",
                        [460, 300],
                        {
                            "values": {
                                "string": [
                                    {
                                        "name": "message",
                                        "value": "Hello from Taiwan! 🇹🇼"
                                    },
                                    {
                                        "name": "timestamp",
                                        "value": "={{ new Date().toISOString() }}"
                                    }
                                ]
                            }
                        }
                    )
                ],
                {
                    "Manual Trigger": {
                        "main": [
                            [n8n.create_connection("Manual Trigger", "Set Taiwan Data")]
                        ]
                    }
                }
            )
            
            created_workflow = await n8n.create_workflow(test_workflow)
            workflow_id = created_workflow.get("id")
            print(f"✅ 成功建立測試工作流: {workflow_id}")
            
            # 3. 執行工作流
            execution = await n8n.execute_workflow(workflow_id)
            execution_id = execution.get("id")
            print(f"✅ 成功執行工作流: {execution_id}")
            
            # 4. 等待執行完成並取得結果
            await asyncio.sleep(2)  # 等待執行完成
            execution_result = await n8n.get_execution(execution_id)
            print(f"✅ 工作流執行狀態: {execution_result.get('status', 'unknown')}")
            
            # 5. 清理測試工作流
            await n8n.delete_workflow(workflow_id)
            print("✅ 測試工作流已清理")
            
            return True
            
        except Exception as e:
            print(f"❌ 工作流操作錯誤: {e}")
            return False


async def verify_node_types():
    """驗證節點類型"""
    print("\n🔍 驗證可用節點類型...")
    
    async with N8nService() as n8n:
        try:
            node_types = await n8n.get_node_types()
            print(f"✅ 找到 {len(node_types)} 種節點類型")
            
            # 檢查基本節點類型
            basic_nodes = [
                "n8n-nodes-base.manualTrigger",
                "n8n-nodes-base.set",
                "n8n-nodes-base.httpRequest",
                "n8n-nodes-base.webhook"
            ]
            
            available_types = [node.get("name", "") for node in node_types]
            
            for node_type in basic_nodes:
                if node_type in available_types:
                    print(f"  ✅ {node_type}")
                else:
                    print(f"  ⚠️  {node_type} (未找到)")
            
            # 檢查台灣自定義節點
            taiwan_nodes = ["linePay", "ecPay", "taoyuanAirport"]
            print("\n台灣自定義節點:")
            for node_type in taiwan_nodes:
                if node_type in available_types:
                    print(f"  ✅ {node_type}")
                else:
                    print(f"  ⚠️  {node_type} (尚未安裝)")
            
            return True
            
        except Exception as e:
            print(f"❌ 節點類型查詢錯誤: {e}")
            return False


async def verify_taiwan_workflow_template():
    """驗證台灣工作流模板"""
    print("\n🔍 驗證台灣工作流模板...")
    
    n8n = N8nService()
    
    try:
        # 建立台灣金流工作流模板
        taiwan_workflow = n8n.create_workflow_json(
            "台灣金流處理模板",
            [
                n8n.create_node(
                    "webhook",
                    "Payment Webhook",
                    "n8n-nodes-base.webhook",
                    [200, 300],
                    {
                        "path": "taiwan-payment",
                        "httpMethod": "POST"
                    }
                ),
                n8n.create_node(
                    "validate",
                    "Validate Payment Data",
                    "n8n-nodes-base.set",
                    [400, 300],
                    {
                        "values": {
                            "number": [
                                {
                                    "name": "amount",
                                    "value": "={{ parseInt($json.amount) }}"
                                }
                            ],
                            "string": [
                                {
                                    "name": "orderId",
                                    "value": "TW-{{ new Date().getTime() }}"
                                },
                                {
                                    "name": "currency",
                                    "value": "TWD"
                                }
                            ]
                        }
                    }
                ),
                n8n.create_node(
                    "line-pay",
                    "Line Pay Processing",
                    "linePay",  # 自定義節點
                    [600, 300],
                    {
                        "resource": "payment",
                        "operation": "create",
                        "amount": "={{ $json.amount }}",
                        "productName": "={{ $json.productName || '台灣商品' }}",
                        "orderId": "={{ $json.orderId }}",
                        "confirmUrl": "https://example.com/confirm",
                        "cancelUrl": "https://example.com/cancel"
                    }
                ),
                n8n.create_node(
                    "response",
                    "Send Response",
                    "n8n-nodes-base.respondToWebhook",
                    [800, 300],
                    {
                        "responseBody": "={{ JSON.stringify({ success: true, orderId: $json.orderId, paymentUrl: $json.paymentUrl }) }}"
                    }
                )
            ],
            {
                "Payment Webhook": {
                    "main": [
                        [n8n.create_connection("Payment Webhook", "Validate Payment Data")]
                    ]
                },
                "Validate Payment Data": {
                    "main": [
                        [n8n.create_connection("Validate Payment Data", "Line Pay Processing")]
                    ]
                },
                "Line Pay Processing": {
                    "main": [
                        [n8n.create_connection("Line Pay Processing", "Send Response")]
                    ]
                }
            }
        )
        
        # 驗證工作流結構
        assert taiwan_workflow["name"] == "台灣金流處理模板"
        assert len(taiwan_workflow["nodes"]) == 4
        assert len(taiwan_workflow["connections"]) == 3
        
        # 驗證節點配置
        line_pay_node = next(
            node for node in taiwan_workflow["nodes"] 
            if node["type"] == "linePay"
        )
        assert line_pay_node["parameters"]["resource"] == "payment"
        assert line_pay_node["parameters"]["operation"] == "create"
        
        print("✅ 台灣工作流模板結構驗證成功")
        print(f"  - 節點數量: {len(taiwan_workflow['nodes'])}")
        print(f"  - 連線數量: {len(taiwan_workflow['connections'])}")
        print(f"  - 包含 Line Pay 節點: ✅")
        
        return True
        
    except Exception as e:
        print(f"❌ 台灣工作流模板驗證錯誤: {e}")
        return False


async def main():
    """主要驗證流程"""
    print("🚀 開始 n8n 整合驗證")
    print("=" * 50)
    
    results = []
    
    # 1. 驗證連線
    connection_ok = await verify_n8n_connection()
    results.append(("連線測試", connection_ok))
    
    if connection_ok:
        # 2. 驗證工作流操作
        workflow_ok = await verify_workflow_operations()
        results.append(("工作流操作", workflow_ok))
        
        # 3. 驗證節點類型
        nodes_ok = await verify_node_types()
        results.append(("節點類型查詢", nodes_ok))
    else:
        print("⚠️  由於連線失敗，跳過其他測試")
        results.append(("工作流操作", False))
        results.append(("節點類型查詢", False))
    
    # 4. 驗證台灣工作流模板（不需要連線）
    template_ok = await verify_taiwan_workflow_template()
    results.append(("台灣工作流模板", template_ok))
    
    # 顯示總結
    print("\n" + "=" * 50)
    print("📊 驗證結果總結:")
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ 通過" if result else "❌ 失敗"
        print(f"  {test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\n總計: {passed}/{total} 項測試通過")
    
    if passed == total:
        print("🎉 所有測試通過！n8n 整合驗證成功")
        return 0
    else:
        print("⚠️  部分測試失敗，請檢查 n8n 服務狀態")
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
