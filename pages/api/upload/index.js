import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

// API 라우트에서 기본적으로 bodyParser를 비활성화합니다.
export const config = {
    api: {
        bodyParser: false,
    },
};

// 업로드 디렉토리 설정
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// 폴더가 존재하지 않으면 생성
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 업로드 처리 핸들러
export default function handler(req, res) {
    const form = new IncomingForm({
        uploadDir,
        keepExtensions: true,
        filename: (name, ext, part, form) => `${Date.now()}${path.extname(part.originalFilename)}`,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const file = files.file[0];
        if (file) {
            const filePath = `/uploads/${path.basename(file.filepath)}`;
            res.status(200).json({ url: filePath });
        } else {
            res.status(400).json({ error: 'No file uploaded' });
        }
    });
}
