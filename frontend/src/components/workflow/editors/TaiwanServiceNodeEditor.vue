<template>
  <div class="taiwan-service-editor">
    <el-form
      :model="nodeData"
      label-position="top"
      size="default"
      @submit.prevent
    >
      <!-- 桃園機場節點 -->
      <template v-if="nodeData.type === 'taoyuanAirport'">
        <el-form-item label="查詢類型" required>
          <el-select
            v-model="nodeData.operation"
            placeholder="選擇查詢類型"
            @change="handleChange"
          >
            <el-option label="航班資訊" value="flightInfo" />
            <el-option label="起飛航班" value="departure" />
            <el-option label="抵達航班" value="arrival" />
            <el-option label="航班狀態" value="status" />
          </el-select>
        </el-form-item>

        <el-form-item label="航廈">
          <el-select
            v-model="nodeData.settings.terminal"
            placeholder="選擇航廈"
            @change="handleChange"
          >
            <el-option label="全部航廈" value="all" />
            <el-option label="第一航廈" value="1" />
            <el-option label="第二航廈" value="2" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="nodeData.operation === 'flightInfo'"
          label="航班號碼"
        >
          <el-input
            v-model="nodeData.settings.flightNumber"
            placeholder="例如：CI123"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="查詢日期">
          <el-date-picker
            v-model="nodeData.settings.date"
            type="date"
            placeholder="選擇查詢日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 政府開放資料節點 -->
      <template v-else-if="nodeData.type === 'govOpenData'">
        <el-form-item label="資料集類型" required>
          <el-select
            v-model="nodeData.settings.datasetType"
            placeholder="選擇資料集類型"
            @change="handleChange"
          >
            <el-option label="交通運輸" value="transport" />
            <el-option label="環境品質" value="environment" />
            <el-option label="社會福利" value="welfare" />
            <el-option label="經濟發展" value="economy" />
            <el-option label="教育文化" value="education" />
          </el-select>
        </el-form-item>

        <el-form-item label="資料集 ID">
          <el-input
            v-model="nodeData.settings.datasetId"
            placeholder="輸入資料集 ID"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="查詢限制">
          <el-input-number
            v-model="nodeData.settings.limit"
            :min="1"
            :max="1000"
            placeholder="資料筆數限制"
            @change="handleChange"
          />
        </el-form-item>

        <el-form-item label="資料格式">
          <el-select
            v-model="nodeData.settings.format"
            @change="handleChange"
          >
            <el-option label="JSON" value="json" />
            <el-option label="XML" value="xml" />
            <el-option label="CSV" value="csv" />
          </el-select>
        </el-form-item>
      </template>

      <!-- 中央氣象署節點 -->
      <template v-else-if="nodeData.type === 'weatherBureau'">
        <el-form-item label="查詢類型" required>
          <el-select
            v-model="nodeData.operation"
            placeholder="選擇查詢類型"
            @change="handleChange"
          >
            <el-option label="目前天氣" value="currentWeather" />
            <el-option label="天氣預報" value="forecast" />
            <el-option label="天氣警報" value="warning" />
            <el-option label="地震資訊" value="earthquake" />
          </el-select>
        </el-form-item>

        <el-form-item label="地區">
          <el-select
            v-model="nodeData.settings.location"
            placeholder="選擇地區"
            @change="handleChange"
          >
            <el-option label="臺北市" value="臺北市" />
            <el-option label="新北市" value="新北市" />
            <el-option label="桃園市" value="桃園市" />
            <el-option label="臺中市" value="臺中市" />
            <el-option label="臺南市" value="臺南市" />
            <el-option label="高雄市" value="高雄市" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="nodeData.operation === 'forecast'"
          label="預報天數"
        >
          <el-input-number
            v-model="nodeData.settings.days"
            :min="1"
            :max="7"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 台鐵資訊節點 -->
      <template v-else-if="nodeData.type === 'taiwanRailway'">
        <el-form-item label="查詢類型" required>
          <el-select
            v-model="nodeData.operation"
            placeholder="選擇查詢類型"
            @change="handleChange"
          >
            <el-option label="時刻表查詢" value="schedule" />
            <el-option label="票價查詢" value="fare" />
            <el-option label="車站資訊" value="station" />
            <el-option label="列車狀態" value="status" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="['schedule', 'fare'].includes(nodeData.operation)"
          label="起站"
        >
          <el-select
            v-model="nodeData.settings.from"
            placeholder="選擇起站"
            filterable
            @change="handleChange"
          >
            <el-option label="台北" value="1000" />
            <el-option label="板橋" value="1001" />
            <el-option label="桃園" value="1002" />
            <el-option label="中壢" value="1003" />
            <el-option label="台中" value="1004" />
            <el-option label="台南" value="1005" />
            <el-option label="高雄" value="1006" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="['schedule', 'fare'].includes(nodeData.operation)"
          label="迄站"
        >
          <el-select
            v-model="nodeData.settings.to"
            placeholder="選擇迄站"
            filterable
            @change="handleChange"
          >
            <el-option label="台北" value="1000" />
            <el-option label="板橋" value="1001" />
            <el-option label="桃園" value="1002" />
            <el-option label="中壢" value="1003" />
            <el-option label="台中" value="1004" />
            <el-option label="台南" value="1005" />
            <el-option label="高雄" value="1006" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="nodeData.operation === 'schedule'"
          label="查詢日期"
        >
          <el-date-picker
            v-model="nodeData.settings.date"
            type="date"
            placeholder="選擇查詢日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 台灣高鐵節點 -->
      <template v-else-if="nodeData.type === 'highSpeedRail'">
        <el-form-item label="查詢類型" required>
          <el-select
            v-model="nodeData.operation"
            placeholder="選擇查詢類型"
            @change="handleChange"
          >
            <el-option label="時刻表查詢" value="schedule" />
            <el-option label="票價查詢" value="fare" />
            <el-option label="車站資訊" value="station" />
            <el-option label="列車狀態" value="status" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="['schedule', 'fare'].includes(nodeData.operation)"
          label="起站"
        >
          <el-select
            v-model="nodeData.settings.from"
            placeholder="選擇起站"
            @change="handleChange"
          >
            <el-option label="南港" value="NanGang" />
            <el-option label="台北" value="Taipei" />
            <el-option label="板橋" value="Banqiao" />
            <el-option label="桃園" value="Taoyuan" />
            <el-option label="新竹" value="Hsinchu" />
            <el-option label="台中" value="Taichung" />
            <el-option label="台南" value="Tainan" />
            <el-option label="左營" value="Zuoying" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="['schedule', 'fare'].includes(nodeData.operation)"
          label="迄站"
        >
          <el-select
            v-model="nodeData.settings.to"
            placeholder="選擇迄站"
            @change="handleChange"
          >
            <el-option label="南港" value="NanGang" />
            <el-option label="台北" value="Taipei" />
            <el-option label="板橋" value="Banqiao" />
            <el-option label="桃園" value="Taoyuan" />
            <el-option label="新竹" value="Hsinchu" />
            <el-option label="台中" value="Taichung" />
            <el-option label="台南" value="Tainan" />
            <el-option label="左營" value="Zuoying" />
          </el-select>
        </el-form-item>
      </template>

      <!-- 健保署節點 -->
      <template v-else-if="nodeData.type === 'healthInsurance'">
        <el-form-item label="查詢類型" required>
          <el-select
            v-model="nodeData.operation"
            placeholder="選擇查詢類型"
            @change="handleChange"
          >
            <el-option label="醫療院所" value="hospital" />
            <el-option label="藥局資訊" value="pharmacy" />
            <el-option label="健保給付" value="coverage" />
          </el-select>
        </el-form-item>

        <el-form-item label="地區">
          <el-input
            v-model="nodeData.settings.location"
            placeholder="輸入地區名稱"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item
          v-if="nodeData.operation === 'hospital'"
          label="醫療科別"
        >
          <el-select
            v-model="nodeData.settings.department"
            placeholder="選擇科別"
            @change="handleChange"
          >
            <el-option label="內科" value="internal" />
            <el-option label="外科" value="surgery" />
            <el-option label="小兒科" value="pediatrics" />
            <el-option label="婦產科" value="gynecology" />
            <el-option label="眼科" value="ophthalmology" />
            <el-option label="耳鼻喉科" value="ent" />
          </el-select>
        </el-form-item>
      </template>

      <!-- 通用台灣服務提示 -->
      <template v-else>
        <el-alert
          title="台灣在地服務"
          description="請選擇具體的台灣服務類型來配置查詢參數。"
          type="info"
          show-icon
          :closable="false"
        />
      </template>

      <!-- 共用設定 -->
      <el-form-item label="語言設定">
        <el-select
          v-model="nodeData.settings.language"
          @change="handleChange"
        >
          <el-option label="繁體中文" value="zh-TW" />
          <el-option label="英文" value="en" />
        </el-select>
      </el-form-item>

      <!-- 台灣服務特色說明 -->
      <div class="taiwan-service-info">
        <el-alert
          title="台灣在地化服務整合"
          type="success"
          show-icon
          :closable="false"
        >
          <template #default>
            <p>此節點專為台灣使用者設計：</p>
            <ul>
              <li>✅ 整合台灣政府開放資料</li>
              <li>✅ 支援繁體中文介面</li>
              <li>✅ 符合台灣資料格式標準</li>
              <li>✅ 提供即時資料更新</li>
            </ul>
          </template>
        </el-alert>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// ===== Props =====

interface Props {
  modelValue: any
  nodeDefinition?: any
}

const props = defineProps<Props>()

// ===== 響應式資料 =====

const nodeData = ref<any>({ ...props.modelValue })

// ===== 方法 =====

const handleChange = () => {
  emit('update:modelValue', nodeData.value)
  emit('change', nodeData.value)
}

// ===== 監聽器 =====

watch(
  () => props.modelValue,
  (newValue) => {
    nodeData.value = { ...newValue }
  },
  { deep: true }
)

// ===== 事件 =====

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()
</script>

<style scoped lang="scss">
.taiwan-service-editor {
  .taiwan-service-info {
    margin-top: $spacing-lg;
    
    ul {
      margin: $spacing-sm 0 0 0;
      padding-left: $spacing-lg;
      
      li {
        margin-bottom: $spacing-xs;
        font-size: $font-size-sm;
      }
    }
  }
}
</style>
