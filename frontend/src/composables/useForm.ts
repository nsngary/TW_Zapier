/**
 * 表單組合式函數
 */

import { ref, reactive, computed, type Ref } from 'vue'

export interface FormField {
  value: any
  rules?: FormRule[]
  error?: string
  touched?: boolean
}

export interface FormRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: any) => boolean | string
  message?: string
}

export interface UseFormOptions {
  validateOnChange?: boolean
  validateOnBlur?: boolean
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  options: UseFormOptions = {}
) => {
  const {
    validateOnChange = true,
    validateOnBlur = true
  } = options

  // 表單資料
  const formData = reactive<T>({ ...initialValues })
  
  // 表單欄位
  const fields = reactive<Record<keyof T, FormField>>({} as any)
  
  // 初始化欄位
  Object.keys(initialValues).forEach(key => {
    fields[key as keyof T] = {
      value: initialValues[key as keyof T],
      rules: [],
      error: '',
      touched: false
    }
  })

  // 表單狀態
  const isSubmitting = ref(false)
  const submitCount = ref(0)

  // ===== 計算屬性 =====

  const isValid = computed(() => {
    return Object.values(fields).every(field => !field.error)
  })

  const isDirty = computed(() => {
    return Object.keys(formData).some(key => {
      return formData[key as keyof T] !== initialValues[key as keyof T]
    })
  })

  const errors = computed(() => {
    const errorObj: Partial<Record<keyof T, string>> = {}
    Object.keys(fields).forEach(key => {
      const field = fields[key as keyof T]
      if (field.error) {
        errorObj[key as keyof T] = field.error
      }
    })
    return errorObj
  })

  // ===== 方法 =====

  /**
   * 設定欄位規則
   */
  const setFieldRules = (fieldName: keyof T, rules: FormRule[]) => {
    if (fields[fieldName]) {
      fields[fieldName].rules = rules
    }
  }

  /**
   * 驗證單一欄位
   */
  const validateField = (fieldName: keyof T): boolean => {
    const field = fields[fieldName]
    if (!field) return true

    const value = formData[fieldName]
    field.error = ''

    for (const rule of field.rules || []) {
      // 必填驗證
      if (rule.required && (!value || value === '')) {
        field.error = rule.message || `${String(fieldName)} 為必填欄位`
        return false
      }

      // 最小長度驗證
      if (rule.min && value && value.length < rule.min) {
        field.error = rule.message || `${String(fieldName)} 最少需要 ${rule.min} 個字元`
        return false
      }

      // 最大長度驗證
      if (rule.max && value && value.length > rule.max) {
        field.error = rule.message || `${String(fieldName)} 最多只能 ${rule.max} 個字元`
        return false
      }

      // 正則表達式驗證
      if (rule.pattern && value && !rule.pattern.test(value)) {
        field.error = rule.message || `${String(fieldName)} 格式不正確`
        return false
      }

      // 自定義驗證器
      if (rule.validator && value) {
        const result = rule.validator(value)
        if (result !== true) {
          field.error = typeof result === 'string' ? result : (rule.message || `${String(fieldName)} 驗證失敗`)
          return false
        }
      }
    }

    return true
  }

  /**
   * 驗證所有欄位
   */
  const validate = (): boolean => {
    let isFormValid = true
    
    Object.keys(fields).forEach(key => {
      const fieldValid = validateField(key as keyof T)
      if (!fieldValid) {
        isFormValid = false
      }
    })

    return isFormValid
  }

  /**
   * 設定欄位值
   */
  const setFieldValue = (fieldName: keyof T, value: any) => {
    formData[fieldName] = value
    
    if (fields[fieldName]) {
      fields[fieldName].value = value
      fields[fieldName].touched = true
      
      if (validateOnChange) {
        validateField(fieldName)
      }
    }
  }

  /**
   * 設定欄位錯誤
   */
  const setFieldError = (fieldName: keyof T, error: string) => {
    if (fields[fieldName]) {
      fields[fieldName].error = error
    }
  }

  /**
   * 清除欄位錯誤
   */
  const clearFieldError = (fieldName: keyof T) => {
    if (fields[fieldName]) {
      fields[fieldName].error = ''
    }
  }

  /**
   * 重設表單
   */
  const reset = () => {
    Object.keys(initialValues).forEach(key => {
      formData[key as keyof T] = initialValues[key as keyof T]
      if (fields[key as keyof T]) {
        fields[key as keyof T].value = initialValues[key as keyof T]
        fields[key as keyof T].error = ''
        fields[key as keyof T].touched = false
      }
    })
    isSubmitting.value = false
    submitCount.value = 0
  }

  /**
   * 提交表單
   */
  const submit = async (onSubmit: (values: T) => Promise<void> | void) => {
    submitCount.value++
    
    // 標記所有欄位為已觸碰
    Object.keys(fields).forEach(key => {
      fields[key as keyof T].touched = true
    })

    if (!validate()) {
      return
    }

    try {
      isSubmitting.value = true
      await onSubmit(formData)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    // 狀態
    formData,
    fields,
    isSubmitting,
    submitCount,

    // 計算屬性
    isValid,
    isDirty,
    errors,

    // 方法
    setFieldRules,
    validateField,
    validate,
    setFieldValue,
    setFieldError,
    clearFieldError,
    reset,
    submit
  }
}
