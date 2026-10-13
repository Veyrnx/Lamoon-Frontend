# วิธีตั้งค่า Supabase (ภาษาไทย)

1. เปิดไฟล์ `.env.example` แล้วคัดลอกเป็น `.env.local` ในโฟลเดอร์เดียวกับ `package.json`
2. เข้า Supabase Dashboard > Project Settings > API แล้วคัดลอก Project URL และ publishable key (หรือ anon key รุ่นเดิม) มาใส่ใน `.env.local`
3. ห้ามใช้ `service_role` หรือ secret key ในเว็บ Ordering หรือ Management
4. ติดตั้งแพ็กเกจด้วย `npm install`
5. เริ่มเว็บด้วย `npm run dev`

ทั้งสองโปรเจกต์ต้องใช้ Project URL และ publishable/anon key ของ Supabase โปรเจกต์เดียวกัน

หมายเหตุ: ไฟล์ `src/lib/supabase.ts` เป็นตัวเชื่อมต่อกลางเท่านั้น ต้องเชื่อมแต่ละหน้ากับ query/RPC และทดสอบสิทธิ์ RLS ต่อก่อนจึงจะถือว่าระบบทำงานครบ
