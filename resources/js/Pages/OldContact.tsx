import Layout from "@/components/layout/Layout";
import { usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@inertiajs/react";
import { router } from '@inertiajs/react';


// Furigana validation - accepts only Japanese hiragana/katakana
const isValidFurigana = (value: string): boolean => {
  if (!value.trim()) return false;
  // Regex for katakana, hiragana, and common spaces/marks
  const furiganaRegex = /^[\u3040-\u309F\u30A0-\u30FF\u3000-\u303F\s]+$/;
  return furiganaRegex.test(value);
};

// Moved outside component to prevent re-creation on each render
const FormField = ({ label, required, children, error, lang }: { label: string; required?: boolean; children: React.ReactNode; error?: string; lang?: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border py-4">
    <div className="bg-muted/50 p-3 rounded">
      <Label className="font-medium text-foreground">{label}</Label>
      {required && <span className="text-primary text-sm block font-medium">*{lang === 'en' ? "Required" : "必須"}</span>}
    </div>
    <div className="md:col-span-2">
      {children}
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  </div>
);

const ReviewField = ({ label, value, required, lang }: { label: string; value: string | string[]; required?: boolean; lang?: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border py-4">
    <div className="bg-muted/30 p-3">
      <span className="font-medium text-foreground text-sm">{label}</span>
      {required && <span className="text-primary text-sm block font-medium">*{lang === 'en' ? "Required" : "必須"}</span>}
    </div>
    <div className="md:col-span-2 p-3">
      <span className="text-foreground">
        {Array.isArray(value) ? value.join(', ') : value || '-'}
      </span>
    </div>
  </div>
);

interface FormErrors {
  productService?: string;
  classification?: string;
  expectedDate?: string;
  companyName?: string;
  lastNameEn?: string;
  firstNameEn?: string;
  lastNameJa?: string;
  firstNameJa?: string;
  zipCode?: string;
  address?: string;
  telephone?: string;
  email?: string;
  emailConfirm?: string;
  agreeTerms?: string;
}

const Contact = () => {
 
  // const getValue = (en?: string | null, ja?: string | null): string => {
  // return (lang === "ja" ? ja || en : en) || "";
// };
const { lang } = usePage<{ lang: "en" | "ja" }>().props;
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    productService: "",
    classification: [] as string[],
    requests: "",
    expectedDate: "",
    companyName: "",
    customerPosition: "",
    departmentName: "",
    post: "",
    lastNameEn: "",
    firstNameEn: "",
    lastNameJa: "",
    firstNameJa: "",
    addressType: "company",
    zipCode: "",
    prefecture: "",
    address: "",
    telephone: "",
    email: "",
    emailConfirm: "",
    agreeTerms: false
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.productService.trim()) {
      newErrors.productService = lang === 'en' ? "Product/service name is required" : "製品・サービス名は必須です";
    }
    if (formData.classification.length === 0) {
      newErrors.classification = lang === 'en' ? "Please select at least one classification" : "分類を1つ以上選択してください";
    }
    if (!formData.expectedDate) {
      newErrors.expectedDate = lang === 'en' ? "Please select expected introduction date" : "導入予定時期を選択してください";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = lang === 'en' ? "Company name is required" : "会社名は必須です";
    }
    if (!formData.lastNameEn.trim()) {
      newErrors.lastNameEn = lang === 'en' ? "Last name is required" : "姓は必須です";
    }
    if (!formData.firstNameEn.trim()) {
      newErrors.firstNameEn = lang === 'en' ? "First name is required" : "名は必須です";
    }

    // Furigana validation
    if (!formData.lastNameJa.trim()) {
      newErrors.lastNameJa = lang === 'en' ? "Furigana (last name) is required" : "フリガナ（セイ）は必須です";
    } else if (!isValidFurigana(formData.lastNameJa)) {
      newErrors.lastNameJa = lang === 'en' ? "Please enter in Japanese Hiragana or Katakana only" : "ひらがなまたはカタカナで入力してください";
    }
    if (!formData.firstNameJa.trim()) {
      newErrors.firstNameJa = lang === 'en' ? "Furigana (first name) is required" : "フリガナ（メイ）は必須です";
    } else if (!isValidFurigana(formData.firstNameJa)) {
      newErrors.firstNameJa = lang === 'en' ? "Please enter in Japanese Hiragana or Katakana only" : "ひらがなまたはカタカナで入力してください";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = lang === 'en' ? "Zip code is required" : "郵便番号は必須です";
    }
    if (!formData.address.trim()) {
      newErrors.address = lang === 'en' ? "Address is required" : "住所は必須です";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = lang === 'en' ? "Telephone number is required" : "電話番号は必須です";
    }
    if (!formData.email.trim()) {
      newErrors.email = lang === 'en' ? "Email address is required" : "メールアドレスは必須です";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === 'en' ? "Please enter a valid email address" : "有効なメールアドレスを入力してください";
    }
    if (formData.email !== formData.emailConfirm) {
      newErrors.emailConfirm = lang === 'en' ? "Email addresses do not match" : "メールアドレスが一致しません";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast({
        title: lang === 'en' ? "Validation Error" : "入力エラー",
        description: lang === 'en' ? "Please check the required fields." : "必須項目をご確認ください。",
        variant: "destructive"
      });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = () => {
  if (!formData.agreeTerms) {
    toast({
      title: lang === 'en' ? "Agreement Required" : "同意が必要です",
      description:
        lang === 'en'
          ? "Please agree to the terms before submitting."
          : "送信前に規約に同意してください。",
      variant: "destructive",
    });
    return;
  }

  setIsSubmitting(true);

  router.post(route('contact.store'), {
    ...formData,
    lang,
  }, {
    onSuccess: () => {
      setCurrentStep(3);                 // ✅ move step AFTER success
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: () => {
      toast({
        title: lang === 'en' ? "Submission Failed" : "送信エラー",
        description:
          lang === 'en'
            ? "Please try again later."
            : "しばらく経ってから再度お試しください。",
        variant: "destructive",
      });
    },
    onFinish: () => {
      setIsSubmitting(false);
    },
  });
};



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleClassificationChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, classification: [...formData.classification, value] });
    } else {
      setFormData({ ...formData, classification: formData.classification.filter(v => v !== value) });
    }
    if (errors.classification) {
      setErrors({ ...errors, classification: undefined });
    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    { number: 1, label: lang === 'en' ? "Enter your inquiry details" : "お問い合わせ内容入力する" },
    { number: 2, label: lang === 'en' ? "Check the input information" : "入力内容を確認する" },
    { number: 3, label: lang === 'en' ? "Your inquiry is complete" : "お問い合わせ完了" },
  ];

  const classifications = [
    { value: "request-info", label: lang === 'en' ? "Request for Information" : "資料請求" },
    { value: "contact-us", label: lang === 'en' ? "Inquiry" : "お問い合わせ" },
    { value: "demo-request", label: lang === 'en' ? "Product Demo Request" : "製品デモ希望" },
    { value: "quotation", label: lang === 'en' ? "Request for quotation" : "見積・提案依頼" },
    { value: "other", label: lang === 'en' ? "Other" : "その他" },
  ];

  const customerPositions = [
    { value: "intro", label: lang === 'en' ? "Introduction to your company" : "会社・組織への導入" },
    { value: "suggestions", label: lang === 'en' ? "Suggestions for Clients" : "クライアントへの提案" },
    { value: "get-info", label: lang === 'en' ? "Get Information" : "情報入手" },
    { value: "other", label: lang === 'en' ? "Other" : "その他" },
  ];

  const expectedDates = [
    { value: "urgent", label: lang === 'en' ? "Urgent" : "至急" },
    { value: "6months", label: lang === 'en' ? "Within 6 months" : "6ヶ月以内" },
    { value: "1year", label: lang === 'en' ? "Within 1 year" : "1年以内" },
    { value: "undecided", label: lang === 'en' ? "Undecided" : "未定" },
  ];

  const prefectures = [
    "Tokyo", "Osaka", "Kanagawa", "Aichi", "Fukuoka", "Hokkaido", "Kyoto", "Hyogo", "Saitama", "Chiba"
  ];

  const getClassificationLabel = (value: string) => {
    return classifications.find(c => c.value === value)?.label || value;
  };

  const getExpectedDateLabel = (value: string) => {
    return expectedDates.find(d => d.value === value)?.label || value;
  };

  const getCustomerPositionLabel = (value: string) => {
    return customerPositions.find(p => p.value === value)?.label || value;
  };


  return (
    <Layout>
      {/* Title */}
      <section className="bg-muted/30 py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-xl md:text-3xl font-bold text-foreground">
            {lang === 'en' ? "Inquiries about products and services" : "商品・サービスについてのお問い合わせ"}
          </h1>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="bg-background py-6">
        <div className="container mx-auto px-4 ">
          <div className="flex max-w-8xl text-center shadow-md">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`flex-1 py-3 px-4 text-xs md:text-sm font-medium transition-colors relative ${
                  currentStep === step.number 
                    ? 'bg-primary text-primary-foreground' 
                    : currentStep > step.number
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted/50 text-muted-foreground'
                }`}
                style={{
                  clipPath: index === steps.length - 1 
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 5% 50%)' 
                    : index === 0 
                      ? 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)'
                      : 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%, 5% 50%)'
                }}
              >
                <span className="font-bold">Step {step.number}.</span><br />
                <span className="hidden md:inline">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 1: Form Entry */}
      {currentStep === 1 && (
        <form onSubmit={handleProceedToConfirm}>
          {/* Inquiry Details Section */}
          <section className="bg-background pb-8">
            <div className="container mx-auto px-4">
              <div className="bg-muted py-3 px-4 mb-2 border-l-4 border-primary">
                <h2 className="text-base font-semibold text-foreground">
                  {lang === 'en' ? "Please fill in your inquiry details" : "お問い合わせ内容をご記入ください"}
                </h2>
              </div>

              <div className="max-w-4xl bg-background border border-border">
                <FormField label={lang === 'en' ? "Product/service name (or subject)" : "商品・サービス名（または件名）"} required error={errors.productService} lang={lang}>
                  <Input
                    name="productService"
                    value={formData.productService}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? "Example: e-gadgets" : "例：e-Kitchen"}
                    className="w-full"
                  />
                </FormField>

                <FormField label={lang === 'en' ? "Type" : "種別"} required error={errors.classification} lang={lang}>
                  <div className="flex flex-wrap gap-4">
                    {classifications.map((item) => (
                      <div key={item.value} className="flex items-center gap-2">
                        <Checkbox 
                          id={item.value}
                          checked={formData.classification.includes(item.value)}
                          onCheckedChange={(checked) => handleClassificationChange(item.value, checked as boolean)}
                        />
                        <Label htmlFor={item.value} className="text-sm cursor-pointer">{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </FormField>

                <FormField label={lang === 'en' ? "Requests, questions, etc." : "要望・質問など"} lang={lang}>
                  <Textarea
                    name="requests"
                    value={formData.requests}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder={lang === 'en' ? "Example: SEO optimization" : "例：SEO最適化"}
                    className="w-full"
                  />
                </FormField>

                <FormField label={lang === 'en' ? "Planned introduction date" : "導入予定時期"} required error={errors.expectedDate} lang={lang}>
                  <RadioGroup 
                    value={formData.expectedDate}
                    onValueChange={(value) => {
                      setFormData({...formData, expectedDate: value});
                      if (errors.expectedDate) setErrors({...errors, expectedDate: undefined});
                    }}
                    className="flex flex-wrap gap-4"
                  >
                    {expectedDates.map((item) => (
                      <div key={item.value} className="flex items-center gap-2">
                        <RadioGroupItem value={item.value} id={`date-${item.value}`} />
                        <Label htmlFor={`date-${item.value}`} className="text-sm cursor-pointer">{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormField>
              </div>
            </div>
          </section>

          {/* Contact Information Section */}
          <section className="bg-background pb-8">
            <div className="container mx-auto px-4">
              <div className="bg-muted py-3 px-4 mb-2 border-l-4 border-primary">
                <h2 className="text-base font-semibold text-foreground">
                  {lang === 'en' ? "Your Contact Information" : "ご連絡先"}
                </h2>
              </div>

              <div className="max-w-4xl bg-background border border-border">
                <FormField label={lang === 'en' ? "Company/organization name" : "会社名・団体名"} required error={errors.companyName} lang={lang}>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? "Example: Indo-Sakura Software Japan K.K." : "例：株式会社日立システムズエンジニアリングサービス"}
                    className="w-full"
                  />
                </FormField>

                <FormField label={lang === 'en' ? "Customer's position" : "お客さまの立場"} lang={lang}>
                  <RadioGroup 
                    value={formData.customerPosition}
                    onValueChange={(value) => setFormData({...formData, customerPosition: value})}
                    className="flex flex-wrap gap-4"
                  >
                    {customerPositions.map((item) => (
                      <div key={item.value} className="flex items-center gap-2">
                        <RadioGroupItem value={item.value} id={`pos-${item.value}`} />
                        <Label htmlFor={`pos-${item.value}`} className="text-sm cursor-pointer">{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormField>

                <FormField label={lang === 'en' ? "Department name" : "部署名"} lang={lang}>
                  <Input
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? "Example: General Affairs Dept" : "例：総務部"}
                    className="w-full"
                  />
                </FormField>

                <FormField label={lang === 'en' ? "Post" : "役職"} lang={lang}>
                  <Input
                    name="post"
                    value={formData.post}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? "Example: Manager" : "例：部長"}
                    className="w-full"
                  />
                </FormField>

                <FormField label={lang === 'en' ? "Name" : "お名前"} required error={errors.lastNameEn || errors.firstNameEn} lang={lang}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground mb-1 block">
                        {lang === 'en' ? "Last Name Example: ES" : "姓 記入例:ES"}
                      </span>
                      <Input
                        name="lastNameEn"
                        value={formData.lastNameEn}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground mb-1 block">
                        {lang === 'en' ? "First Name Example: Mirai" : "名 記入例:未来"}
                      </span>
                      <Input
                        name="firstNameEn"
                        value={formData.firstNameEn}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </FormField>

                <FormField label={lang === 'en' ? "Furigana (Hiragana)" : "ふりがな（ひらがな）"} required error={errors.lastNameJa || errors.firstNameJa} lang={lang}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground mb-1 block">
                        {lang === 'en' ? "Last name Example: Iyes" : "姓 記入例:いーえす"}
                      </span>
                      <Input
                        name="lastNameJa"
                        value={formData.lastNameJa}
                        onChange={handleInputChange}
                        placeholder={lang === 'en' ? "Hiragana/Katakana only" : "ひらがな・カタカナのみ"}
                      />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground mb-1 block">
                        {lang === 'en' ? "First name Example: Mirai" : "名 記入例:みらい"}
                      </span>
                      <Input
                        name="firstNameJa"
                        value={formData.firstNameJa}
                        onChange={handleInputChange}
                        placeholder={lang === 'en' ? "Hiragana/Katakana only" : "ひらがな・カタカナのみ"}
                      />
                    </div>
                  </div>
                </FormField>

                <FormField label={lang === 'en' ? "Address classification" : "住所区分"} lang={lang}>
                  <RadioGroup 
                    value={formData.addressType}
                    onValueChange={(value) => setFormData({...formData, addressType: value})}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="company" id="addr-company" />
                      <Label htmlFor="addr-company" className="text-sm cursor-pointer">
                        {lang === 'en' ? "Company (school)" : "会社（学校）"}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="home" id="addr-home" />
                      <Label htmlFor="addr-home" className="text-sm cursor-pointer">
                        {lang === 'en' ? "Home" : "自宅"}
                      </Label>
                    </div>
                  </RadioGroup>
                </FormField>

                <FormField label={lang === 'en' ? "Post code" : "郵便番号"} required error={errors.zipCode} lang={lang}>
                  <div className="flex gap-2 items-center">
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder={lang === 'en' ? "Example: 220-8132" : "記入例:220 9132"}
                      className="w-48"
                    />
                    <Button type="button" variant="outline" size="sm" className="whitespace-nowrap">
                      {lang === 'en' ? "Address Search" : "住所検索"}
                    </Button>
                  </div>
                </FormField>

                <FormField label={lang === 'en' ? "Prefecture" : "都道府県"} lang={lang}>
                  <Select 
                    value={formData.prefecture}
                    onValueChange={(value) => setFormData({...formData, prefecture: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={lang === 'en' ? "Please select your prefecture" : "都道府県を選択してください"} />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {prefectures.map((pref) => (
                        <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label={lang === 'en' ? "Address" : "住所"} required error={errors.address} lang={lang}>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? "Example: Yokohama Landmark Tower 32F, 2-2-1 Minato Mirai" : "記入例:横浜市西区みなとみらい2-2-1 横浜ランドマークタワー32階"}
                    className="w-full"
                  />
                </FormField>

                <FormField label={lang === 'en' ? "Telephone number" : "電話番号"} required error={errors.telephone} lang={lang}>
                  <Input
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? "Example: 045-000-0000" : "記入例:045-000-0000"}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {lang === 'en' ? "※ Please refrain from entering a free email address or mobile address." : "※ フリーメールアドレスや携帯アドレスの入力はご遠慮ください。"}
                  </p>
                </FormField>

                <FormField label={lang === 'en' ? "E-mail address" : "e-mailアドレス"} required error={errors.email || errors.emailConfirm} lang={lang}>
                  <div className="space-y-2">
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      ({lang === 'en' ? "Re-enter" : "再入力"})
                    </p>
                    <Input
                      name="emailConfirm"
                      type="email"
                      value={formData.emailConfirm}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section className="bg-background pb-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="bg-muted py-3 px-4 mb-4 border-l-4 border-primary">
                  <h2 className="text-base font-semibold text-foreground">
                    {lang === 'en' ? "About the protection of personal information entered in this form" : "当フォームにご入力された個人情報の保護について"}
                  </h2>
                </div>

                <div className="text-xs text-muted-foreground space-y-2 mb-6 p-4 border border-border bg-muted/20">
                  <p>
                    {lang === 'en' 
                      ? "Before submitting, please read the 'Handling of Personal Information Entered in This Form' carefully and check the agreement box if you agree."
                      : "送信前に、本『当フォームにご入力された個人情報の保護について』をお読みいただき、記載されている約束に同意していただく必要があります。以下の内容をよくお読みいただき、同意していただける場合は下の「上記内容に同意のうえ、確認ページへ進む」ボタンをクリックして進んでください。"}
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>{lang === 'en' ? "Personal information entered will be used only for responding to inquiries." : "・入力いただいた個人情報は、お問い合わせへの回答のみに利用します。"}</li>
                    <li>{lang === 'en' ? "Information may be shared with group companies for better service." : "・お問い合わせの内容がグループ会社（外国企業含む）に関するものの場合、回答のために弊社グループ会社に宛先、氏名、メールアドレス、お問い合わせ内容等を、問い合わせ管理システム内またはメールで転送し、当該グループ会社から回答させていただく場合があります。"}</li>
                    <li>{lang === 'en' ? "We’re committed to crafting concepts that help you reach new heights with our GenAI, Mobile app, Software Development, AL/ML Development, ERP solutions, Business Intelligence and Cybersecurity Solutions." : "・お問い合わせの内容がグループ会社（外国企業含む）に関するものの場合、回答のために弊社グループ会社に宛先、氏名、メールアドレス、お問い合わせ内容等を、問い合わせ管理システム内またはメールで転送し、当該グループ会社から回答させていただく場合があります。"}</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button type="button" variant="outline" className="w-full sm:w-auto">
                      {lang === 'en' ? "Do not agree (Cancel inquiry)" : "同意しない（お問い合わせをやめる）"}
                    </Button>
                  </Link>
                  <Button type="submit" className="w-full sm:w-auto bg-primary">
                    {lang === 'en' ? "Agree and proceed to confirmation page" : "上記内容に同意のうえ確認ページへ進む"}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </form>
      )}

      {/* Step 2: Confirmation */}
      {currentStep === 2 && (
        <section className="bg-background pb-8">
          <div className="container mx-auto px-4">
            <div className="bg-muted py-3 px-4 mb-2 border-l-4 border-primary">
              <h2 className="text-base font-semibold text-foreground">
                {lang === 'en' ? "Please check your input" : "入力内容をご確認ください"}
              </h2>
            </div>

            <div className="max-w-4xl mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                {lang === 'en' 
                  ? "We will only send the information you have entered below. Please check the information you have entered and press the 'Send' button if it is correct. If there are any errors or omissions in the information you have entered, please press the 'Edit Input Information' button."
                  : "以下に入力された情報のみを送信します。入力した情報を確認し、正しければ「送信」ボタンを押してください。入力した情報に誤りや漏れがある場合は、「入力情報を修正する」ボタンを押してください。"}
              </p>
            </div>

            <div className="max-w-4xl">
              <h3 className="font-medium text-foreground mb-4 text-sm">
                {lang === 'en' ? "Your input information" : "入力内容"}
              </h3>

              <div className="bg-background border border-border">
                <ReviewField 
                  label={lang === 'en' ? "Product/service name (or subject)" : "商品・サービス名（または件名）"}
                  value={formData.productService}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Type" : "種別"}
                  value={formData.classification.map(getClassificationLabel)}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Requests, questions, etc." : "要望・質問など"}
                  value={formData.requests}
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Planned introduction date" : "導入予定時期"}
                  value={getExpectedDateLabel(formData.expectedDate)}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Company/organization name" : "会社名・団体名"}
                  value={formData.companyName}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Customer's position" : "お客さまの立場"}
                  value={getCustomerPositionLabel(formData.customerPosition)}
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Department name" : "部署名"}
                  value={formData.departmentName}
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Post" : "役職"}
                  value={formData.post}
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Name" : "お名前"}
                  value={`${formData.lastNameEn} ${formData.firstNameEn}`}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Furigana (Hiragana)" : "ふりがな（ひらがな）"}
                  value={`${formData.lastNameJa} ${formData.firstNameJa}`}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Address classification" : "住所区分"}
                  value={formData.addressType === 'company' 
                    ? (lang === 'en' ? 'Company (school)' : '会社（学校）') 
                    : (lang === 'en' ? 'Home' : '自宅')}
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Post code" : "郵便番号"}
                  value={formData.zipCode}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Address" : "住所"}
                  value={`${formData.prefecture ? formData.prefecture + ' ' : ''}${formData.address}`}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "Telephone number" : "電話番号"}
                  value={formData.telephone}
                  required
                  lang={lang}
                />
                <ReviewField 
                  label={lang === 'en' ? "E-mail address" : "e-mailアドレス"}
                  value={formData.email}
                  required
                  lang={lang}
                />
              </div>

              <div className="mt-6 flex items-center gap-2">
                <Checkbox 
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
                />
                <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                  {lang === 'en' ? "I agree to the terms and conditions" : "利用規約に同意します"}
                </Label>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={goBackToStep1}
                  className="border-foreground text-foreground hover:bg-muted"
                >
                  {lang === 'en' ? "Correcting input information" : "入力情報を修正する"}
                </Button>
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 px-12"
                >
                  {isSubmitting 
                    ? (lang === 'en' ? "Sending..." : "送信中...") 
                    : (lang === 'en' ? "Send" : "送信")
                  }
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Complete */}
      {currentStep === 3 && (
        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-xl font-bold text-foreground mb-4">
                {lang === 'en' ? "Thanks for getting in contact!" : "お問い合わせありがとうございます！"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {lang === 'en' 
                  ? "All staff members will do their best to respond promptly, but please note that responses may be delayed due to the absence of the person in charge."
                  : "担当者が不在の場合、対応が遅れる場合がありますが、スタッフ一同、迅速に対応いたします。"}
              </p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90">
                  {lang === 'en' ? "Return to Home" : "ホームに戻る"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Contact;
