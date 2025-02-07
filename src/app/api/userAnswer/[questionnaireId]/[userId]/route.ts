import { NextResponse } from 'next/server';
import { UserAnswers } from '@/types';
import fs from 'fs';
import path from 'path';

interface Params {
  params: Promise<{
    questionnaireId: string;
    userId: string;
  }>;
}

const getFilePath = (questionnaireId: string, userId: string) =>
  path.join(process.cwd(), `assets/answers/${questionnaireId}`, `${userId}.json`);

const getDirPath = (questionnaireId: string) =>
  path.join(process.cwd(), `assets/answers/${questionnaireId}`);

const readData = (questionnaireId: string, userId: string) => {
  try {
    const path = getFilePath(questionnaireId, userId);

    if (!fs.existsSync(path)) {
      fs.mkdirSync(getDirPath(questionnaireId));
      writeData({
        userId,
        questionnaireId,
        answers: {}
      });
    }

    const jsonData = fs.readFileSync(path, 'utf8');

    return JSON.parse(jsonData);
  } catch (error) {
    console.error('READ error:', error);

    return {};
  }
};

const writeData = (data: UserAnswers) => {
  try {
    const { userId, questionnaireId } = data;
    const path = getFilePath(questionnaireId, userId);

    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');

    return { success: true };
  } catch (error) {
    console.error('WRITE error:', error);

    return { success: false };
  }
};

export async function GET(request: Request, { params }: Params) {
  const { questionnaireId, userId } = await params;
  const data = readData(questionnaireId, userId as string);

  return NextResponse.json({ data });
}

export async function POST(request: Request, { params }: Params) {
  const { questionnaireId, userId } = await params;
  const { data } = await request.json();
  const oldData = readData(questionnaireId, userId);
  const message = writeData({
    ...oldData,
    ...data
  });

  return NextResponse.json({ message });
}
