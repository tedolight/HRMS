/**
 * Helper to generate and download an authentic public record / document
 * from the Hadiya Zone Science & Technology Department.
 */
export function downloadOfficialDocument(document) {
  if (!document) return;

  const content = `================================================================================
FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA
CENTRAL ETHIOPIA REGIONAL STATE
HADIYA ZONE SCIENCE AND TECHNOLOGY DEPARTMENT
Hossana Executive Headquarters, Kebele 02 | P.O. Box 24, Hossana
================================================================================

OFFICIAL PUBLIC RECORD / DIRECTIVE
Document Reference: ${document.id || 'DOC-HZST-2026'}
Title:             ${document.name}
Category:          ${document.category || 'Public Information'}
Year of Issue:     ${document.year || '2026'}
File Size:         ${document.size || 'Standard Copy'}
Authenticated By:  Hadiya Zone S&T Legal & Administrative Registry

--------------------------------------------------------------------------------
1. INSTITUTIONAL MANDATE & CONTEXT
--------------------------------------------------------------------------------
This document constitutes an official public instrument promulgated by the
Hadiya Zone Science and Technology Department in accordance with regional
civil service proclamations and the Zonal Executive Governance Charter.

--------------------------------------------------------------------------------
2. RECORD SUMMARY & SPECIFICATION
--------------------------------------------------------------------------------
${document.description || 'Official guidelines, citizen charter metrics, or civil service regulations established to govern public technology initiatives, scientific research grants, and regional digital transformation programs.'}

--------------------------------------------------------------------------------
3. CITIZEN RIGHTS & COMPLIANCE NOTICE
--------------------------------------------------------------------------------
- This copy is issued free of charge to any resident, citizen, or institution.
- Public service inquiries regarding this document may be directed to:
  Email: contact@hadiyast.gov.et / info@hadiyast.gov.et
  Helpline: +251 46 555 1234
  Office: Executive Administrative Complex, Kebele 02, Hossana City.

--------------------------------------------------------------------------------
AUTHENTICATION VERIFICATION
Verification Code: HZST-${Date.now().toString(36).toUpperCase()}
Issued Date:       ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Status:            CERTIFIED PUBLIC RECORD
================================================================================
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement('a');
  anchor.href = url;
  const sanitizedName = (document.name || 'Official_Document')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 40);
  anchor.download = `${document.id || 'DOC'}_${sanitizedName}.txt`;
  window.document.body.appendChild(anchor);
  anchor.click();
  window.document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

