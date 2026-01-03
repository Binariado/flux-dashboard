import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

export default function SimplePage() {
    const { t } = useTranslation();
    return (
        <div className="p-6">
            <Title level={2}>{t('pages.simple.title')}</Title>
            <Paragraph>
                {t('pages.simple.description')}
            </Paragraph>
        </div>
    );
}
