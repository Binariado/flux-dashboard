import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

export default function NestedPage() {
    const { t } = useTranslation();
    return (
        <div className="p-6">
            <Title level={2}>{t('pages.nested.title')}</Title>
            <Paragraph>
                {t('pages.nested.description')}
            </Paragraph>
        </div>
    );
}
