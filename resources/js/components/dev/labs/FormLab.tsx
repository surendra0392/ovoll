import {
    Input,
    Textarea,
    Checkbox,
    Switch,
    RadioGroup,
    RadioItem,
    Select,
    FormField,
    Text,
} from '@/components/ui';
import { PreviewWrapper } from '../PreviewWrapper';

export function FormLab() {
    return (
        <div className="space-y-8 pb-32">
            <div className="border-border mb-8 border-b pb-4">
                <Text variant="h3">Form Lab</Text>
                <Text variant="body" className="text-muted-foreground">
                    Test form inputs, validation states, and complex controls.
                </Text>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <PreviewWrapper
                    title="Standard Input"
                    codeSnippet={
                        '<FormField label="Email Address">\n  <Input placeholder="name@example.com" />\n</FormField>'
                    }
                >
                    <FormField label="Email Address" className="w-full max-w-sm">
                        <Input placeholder="name@example.com" />
                    </FormField>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Input with Icon"
                    codeSnippet={
                        '<FormField label="Search">\n  <Input placeholder="Search..." leftIcon={<SearchIcon />} />\n</FormField>'
                    }
                >
                    <FormField label="Search" className="w-full max-w-sm">
                        <Input
                            placeholder="Search..."
                            leftIcon={
                                <svg
                                    className="text-muted-foreground h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            }
                        />
                    </FormField>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Error State"
                    codeSnippet={
                        '<FormField label="Username" error="Username is taken">\n  <Input placeholder="username" hasError />\n</FormField>'
                    }
                >
                    <FormField
                        label="Username"
                        error="Username is taken"
                        className="w-full max-w-sm"
                    >
                        <Input placeholder="username" hasError defaultValue="johndoe123" />
                    </FormField>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Textarea"
                    codeSnippet={
                        '<FormField label="Bio">\n  <Textarea placeholder="Tell us about yourself..." rows={4} />\n</FormField>'
                    }
                >
                    <FormField label="Bio" className="w-full max-w-sm">
                        <Textarea placeholder="Tell us about yourself..." rows={4} />
                    </FormField>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Select Box"
                    codeSnippet={
                        '<FormField label="Role">\n  <Select placeholder="Select a role" options={[{value:"admin", label:"Admin"}]} />\n</FormField>'
                    }
                >
                    <FormField label="Role" className="w-full max-w-sm">
                        <Select
                            placeholder="Select a role"
                            value=""
                            onChange={() => {}}
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'user', label: 'User' },
                            ]}
                        />
                    </FormField>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Toggles & Checks"
                    codeSnippet={
                        '<div className="space-y-4">\n  <Switch label="Enable notifications" checked />\n  <Checkbox label="Accept terms" checked />\n</div>'
                    }
                >
                    <div className="w-full max-w-sm space-y-4">
                        <Switch
                            label="Enable notifications"
                            checked={true}
                            onCheckedChange={() => {}}
                        />
                        <Checkbox
                            label="Accept terms and conditions"
                            checked={true}
                            onCheckedChange={() => {}}
                        />
                    </div>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Radio Group"
                    codeSnippet={
                        '<RadioGroup orientation="vertical">\n  <RadioItem value="1" label="Option 1" />\n  <RadioItem value="2" label="Option 2" />\n</RadioGroup>'
                    }
                >
                    <RadioGroup
                        value="1"
                        onValueChange={() => {}}
                        orientation="vertical"
                        className="w-full max-w-sm"
                    >
                        <RadioItem value="1" label="Standard ($0)" />
                        <RadioItem value="2" label="Express ($15)" />
                        <RadioItem value="3" label="Same Day ($25)" disabled />
                    </RadioGroup>
                </PreviewWrapper>
            </div>
        </div>
    );
}
